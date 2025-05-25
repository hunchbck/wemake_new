import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/otp-complete-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Verify OTP | wemake" }];
};

export default function OtpPage() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Confirm OTP</h1>
          <p className="text-muted-foreground text-sm">
            Enter the OTP code sent to your email address.
          </p>
        </div>
        <Form className="w-full space-y-4">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          <InputPair
            label="OTP"
            description="Enter the OTP code sent to your email address"
            name="otp"
            id="otp"
            required
            type="number"
            placeholder="i.e 1234"
          />
          <Button className="w-full" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
