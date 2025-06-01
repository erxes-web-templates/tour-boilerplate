"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, Lock, Mail, CheckCircle } from "lucide-react";
import { useMutation, gql } from "@apollo/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import data from "@/data/configs.json"; // Adjust the import path as needed
const FORGOT_PASSWORD = gql`
  mutation clientPortalForgotPassword(
    $clientPortalId: String!
    $phone: String
    $email: String
  ) {
    clientPortalForgotPassword(
      clientPortalId: $clientPortalId
      phone: $phone
      email: $email
    )
  }
`;

const RESET_PASSWORD = gql`
  mutation ClientPortalResetPassword($token: String!, $newPassword: String!) {
    clientPortalResetPassword(token: $token, newPassword: $newPassword)
  }
`;

const emailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const resetSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Step = "email" | "email-sent" | "reset" | "success";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const [getVerificationCode, { loading: sendingCode }] =
    useMutation(FORGOT_PASSWORD);
  const [resetPassword, { loading: resetting }] = useMutation(RESET_PASSWORD);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Check for token in URL on component mount
  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
      setStep("reset");
    }
  }, [searchParams]);

  const onSendCode = async (values: z.infer<typeof emailSchema>) => {
    try {
      setError("");
      await getVerificationCode({
        variables: {
          clientPortalId: data.cpId, // Replace with actual client portal ID
          email: values.email,
        },
      });
      setEmail(values.email);
      setStep("email-sent");
    } catch (err: any) {
      setError(err.message || "Failed to send verification email");
    }
  };

  const onResetPassword = async (values: z.infer<typeof resetSchema>) => {
    try {
      setError("");
      await resetPassword({
        variables: {
          token: token,
          newPassword: values.newPassword,
        },
      });
      setStep("success");
      // Clear the token from URL
      router.replace("/reset-password");
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    }
  };

  const renderEmailStep = () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Reset Password
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {`Enter your email address and we'll send you a link to reset your
          password.`}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onSendCode)}
            className="space-y-4"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={sendingCode}>
              {sendingCode ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

  const renderEmailSentStep = () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          Check Your Email
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="space-y-2">
          <p className="text-muted-foreground">
            {`            We've sent a verification email to:
`}
          </p>
          <p className="font-medium">{email}</p>
          <p className="text-sm text-muted-foreground">
            Please follow the link in your email to reset your password.
          </p>
        </div>
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-3">
            {`            Didn't receive the email? Check your spam folder or try again.
`}{" "}
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setStep("email");
              setError("");
            }}
          >
            Try Different Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderResetStep = () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Set New Password
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your new password below.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...resetForm}>
          <form
            onSubmit={resetForm.handleSubmit(onResetPassword)}
            className="space-y-4"
          >
            <FormField
              control={resetForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={resetting}>
              {resetting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

  const renderSuccessStep = () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-green-600">
          Password Reset Successful!
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
        <p className="text-muted-foreground">
          Your password has been successfully reset. You can now log in with
          your new password.
        </p>
        <Button
          className="w-full"
          onClick={() => {
            // Redirect to login page or wherever appropriate
            router.push("/login"); // Adjust this path as needed
          }}
        >
          Go to Login
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md">
        {step === "email" && renderEmailStep()}
        {step === "email-sent" && renderEmailSentStep()}
        {step === "reset" && renderResetStep()}
        {step === "success" && renderSuccessStep()}
      </div>
    </main>
  );
}
