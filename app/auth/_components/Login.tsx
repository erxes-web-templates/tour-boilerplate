"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gql, useMutation } from "@apollo/client"; // import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import cpData from "@/data/configs.json";
import Image from "next/image";
import { LOGIN_MUTATION } from "../_graphql/mutations";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [loginFunc, { loading }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginFunc({
        variables: {
          login: email,
          clientPortalId: cpData.cpId,
          password,
        },
      });
      if (data?.clientPortalLogin) {
        const redirectPath = localStorage.getItem("redirectPath") || "/";

        localStorage.removeItem("redirectPath"); // Clear redirect path after login
        window.location.href = redirectPath; // Redirect to the saved path
        toast.success("Logged in successfully");
      }
    } catch (error: any) {
      toast.error(`Login failed: ${error.message} `);
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div>
        {/* <h2 className="text-center mb-6 text-4xl font-bold">BMS LOGO</h2> */}
        <div className="flex mb-6 justify-between">
          <Image src="/Erxes-logo.png" alt="logo" width={160} height={160} />
          <Image
            src="/images/travel-logo.svg"
            alt="logo"
            width={160}
            height={160}
            className="ml-3"
          />
        </div>
        <Card className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">
                Sign in to your account
              </CardTitle>
              <CardDescription>
                Enter your email and password below to access your account.
              </CardDescription>{" "}
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email / Username</Label>

                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/reset-password"
                    className="text-sm underline underline-offset-4 hover:text-primary"
                    prefetch={false}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* {error && (
                <Alert>
                  <AlertDescription className="text-red-500 text-sm">
                    {error.message === "Invalid login" ? "Email or password is wrong. Please try again." : error.message}
                  </AlertDescription>
                </Alert>
              )} */}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {loading ? "Loading..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
