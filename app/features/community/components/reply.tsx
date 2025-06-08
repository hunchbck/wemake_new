import { DotIcon, MessageCircleIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useOutletContext } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import type { action } from "../pages/post-page";

interface ReplyProps {
  name: string;
  username: string;
  avatarUrl: string | null;
  content: string;
  timestamp: string;
  topLevel: boolean;
  topLevelId: number;
  replies?: {
    post_reply_id: number;
    reply: string;
  };
}

export function Reply({
  name,
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel,
  topLevelId,
  replies
}: ReplyProps) {
  const actionData = useActionData<typeof action>();
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  const {
    isLoggedIn,
    name: loggedInName,
    avatar
  } = useOutletContext<{
    isLoggedIn: boolean;
    name: string;
    avatar: string;
  }>();
  useEffect(() => {
    if (actionData?.ok) {
      setReplying(false);
    }
  }, [actionData]);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-2/3 items-start gap-5">
        <Avatar className="size-14">
          <AvatarFallback>{name[0]}</AvatarFallback>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        </Avatar>
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <Link to={`/users/${username}`}>
              <h4 className="font-medium">{name}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-muted-foreground text-xs">
              {DateTime.fromISO(timestamp).toRelative()}
            </span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          {isLoggedIn ? (
            <Button
              variant="ghost"
              className="self-end"
              onClick={toggleReplying}
            >
              <MessageCircleIcon className="size-4" />
              Reply
            </Button>
          ) : null}
        </div>
      </div>
      {replying && (
        <Form className="flex w-3/4 items-start gap-5" method="post">
          <input type="hidden" name="topLevelId" value={topLevelId} />
          <Avatar className="size-14">
            <AvatarFallback>{loggedInName[0]}</AvatarFallback>
            <AvatarImage src={avatar} />
          </Avatar>
          <div className="flex w-full flex-col items-end gap-5">
            <Textarea
              autoFocus
              name="reply"
              placeholder="Write a reply"
              className="w-full resize-none"
              defaultValue={`@${username} `}
              rows={5}
            />
            <Button>Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && replies && (
        <div className="w-full pl-20">
          {replies.map((reply) => (
            <Reply
              key={reply.post_reply_id}
              name={reply.user?.name}
              username={reply.user?.username}
              avatarUrl={reply.user?.avatar}
              content={reply.reply}
              timestamp={reply.created_at}
              topLevel={false}
              topLevelId={topLevelId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
