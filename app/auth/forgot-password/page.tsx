"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, Lock, Mail, ArrowLeft } from "lucide-react";
import { useMutation, gql } from "@apollo/client";
import data from "@/data/configs.json";
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
import Link from "next/link";

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
    token: z.string().min(1, {
      message: "Verification code is required.",
    }),
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

type Step = "email" | "reset" | "success";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

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
      setStep("reset");
    } catch (err: any) {
      setError(err.message || "Failed to send verification code");
    }
  };

  const onResetPassword = async (values: z.infer<typeof resetSchema>) => {
    try {
      setError("");
      await resetPassword({
        variables: {
          token: values.token,
          newPassword: values.newPassword,
        },
      });
      setStep("success");
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
              {sendingCode ? "Sending..." : "Send Verification Code"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

  const renderResetStep = () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Reset Password
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the verification code sent to {email}
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
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter verification code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <div className="space-y-2">
              <Button type="submit" className="w-full" disabled={resetting}>
                {resetting ? "Resetting..." : "Reset Password"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep("email")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Email
              </Button>
            </div>
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
        <p className="text-muted-foreground">
          Your password has been successfully reset. You can now log in with
          your new password.
        </p>
        <Link href="/auth/login" className="mt-3 underline">
          Go to Login
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md">
        {step === "email" && renderEmailStep()}
        {step === "reset" && renderResetStep()}
        {step === "success" && renderSuccessStep()}
      </div>
    </main>
  );
}
