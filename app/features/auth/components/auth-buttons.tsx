import { GithubIcon, LockIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";

export default function AuthButtons() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full flex-col items-center gap-2">
        <Separator className="w-full" />
        <span className="text-muted-foreground text-xs font-medium uppercase">
          Or continue with
        </span>
        <Separator className="w-full" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/kakao/start">
            <MessageCircleIcon className="h-4 w-4" />
            Kakao Talk
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/github/start">
            <GithubIcon className="h-4 w-4" />
            Github
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/otp/start">
            <LockIcon className="h-4 w-4" />
            OTP
          </Link>
        </Button>
      </div>
    </div>
  );
}
