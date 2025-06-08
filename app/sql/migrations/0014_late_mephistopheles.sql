ALTER TABLE post_replies
DROP CONSTRAINT fk_parent_reply;
ALTER TABLE "post_replies" RENAME COLUMN "parent_reply_id" TO "parent_id";
ALTER TABLE post_replies
ADD CONSTRAINT fk_parent_reply
FOREIGN KEY (parent_id)
REFERENCES post_replies(post_reply_id)
ON DELETE CASCADE;