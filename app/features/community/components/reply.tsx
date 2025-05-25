import { DotIcon, MessageCircleIcon } from "lucide-react";
import { useState } from "react";
import { Form, Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  topLevel: boolean;
}

export function Reply({
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-2/3 items-start gap-5">
        <Avatar className="size-14">
          <AvatarFallback>{username[0]}</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Link to={`/users/${username}`}>
              <h4 className="font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-muted-foreground text-xs">{timestamp}</span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          <Button variant="ghost" className="self-end" onClick={toggleReplying}>
            <MessageCircleIcon className="size-4" />
            Reply
          </Button>
        </div>
      </div>
      {replying && (
        <Form className="flex w-3/4 items-start gap-5">
          <Avatar className="size-14">
            <AvatarFallback>N</AvatarFallback>
            <AvatarImage src="https://github.com/serranoarevalo.png" />
          </Avatar>
          <div className="flex w-full flex-col items-end gap-5">
            <Textarea
              placeholder="Write a reply"
              className="w-full resize-none"
              rows={5}
            />
            <Button>Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && (
        <div className="w-full pl-20">
          <Reply
            username="Nicolas"
            avatarUrl="https://github.com/serranoarevalo.png"
            content="I've been using Todoist for a while now, and it's really great. It's simple, easy to use, and has a lot of features."
            timestamp="12 hours ago"
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
