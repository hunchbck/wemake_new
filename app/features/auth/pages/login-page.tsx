import { LoaderCircle, Terminal } from "lucide-react";
import { Form, Link, redirect, useNavigation } from "react-router";
import { z } from "zod";
import InputPair from "~/common/components/input-pair";
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "~/common/components/ui/alert";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import AuthButtons from "../components/auth-buttons";
import type { Route } from "./+types/login-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | wemake" }];
};

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be a string"
    })
    .email({
      message: "Invalid email address"
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be a string"
    })
    .min(8, {
      message: "Password must be at least 8 characters long"
    })
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      loginError: null,
      formError: error.flatten().fieldErrors
    };
  }
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password
  });
  if (loginError) {
    return {
      loginError: loginError.message,
      formError: null
    };
  }
  return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <Button variant={"ghost"} asChild className="absolute top-8 right-8">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-10">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.formError?.email?.map((error) => (
                <span key={error}>{error}</span>
              ))}
            </p>
          )}
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="i.e wemake@example.com"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.formError?.password?.map((error) => (
                <span key={error}>{error}</span>
              ))}
            </p>
          )}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Log in"
            )}
          </Button>

          {actionData && "loginError" in actionData && (
            <Alert variant="destructive">
              <Terminal />
              <AlertTitle>로그인 에러!</AlertTitle>
              <AlertDescription>{actionData.loginError}</AlertDescription>
            </Alert>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
