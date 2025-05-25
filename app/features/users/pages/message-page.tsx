import { SendIcon } from "lucide-react";
import { Form } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import { Textarea } from "~/common/components/ui/textarea";
import { MessageBubble } from "../components/message-bubble";
import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | wemake" }];
};

export default function MessagePage() {
  return (
    <div className="flex h-full flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/stevejobs.png" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle className="text-xl">Steve Jobs</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="flex h-full flex-col justify-start overflow-y-scroll py-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <MessageBubble
            key={index}
            avatarUrl="https://github.com/stevejobs.png"
            avatarFallback="S"
            content="this is a message from steve jobs in iheaven, make sure to reply because if you don't, you will be punished."
            isCurrentUser={index % 2 === 0}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex items-center justify-end">
            <Textarea
              placeholder="Write a message..."
              rows={2}
              className="resize-none"
            />
            <Button type="submit" size="icon" className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
