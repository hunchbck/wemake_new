import { EyeIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  avatarUrl: string;
  avatarFallback: string;
  userName: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

export function NotificationCard({
  avatarUrl,
  avatarFallback,
  userName,
  message,
  timestamp,
  seen
}: NotificationCardProps) {
  return (
    <Card className={cn("min-w-[450px]", seen ? "" : "bg-yellow-500/60")}>
      <CardHeader className="flex flex-row items-start gap-5 space-y-0">
        <Avatar className="">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="space-y-0 text-lg font-bold">
            <span>{userName}</span>
            <span>{message}</span>
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="icon">
          <EyeIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
