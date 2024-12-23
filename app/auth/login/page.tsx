import LoginForm from "../_components/Login";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export default function LoginPage() {
  // const cookieStore = cookies();
  // const authToken = cookieStore.get("auth-token");

  // If auth token exists, redirect to dashboard
  // if (authToken?.value) {
  //   return redirect("/dashboard");
  // }

  return <LoginForm />;
}
