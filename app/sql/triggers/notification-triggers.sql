DROP FUNCTION IF EXISTS public.notify_follow() CASCADE;
DROP TRIGGER IF EXISTS notify_follow_trigger ON public.follows;

CREATE FUNCTION public.notify_follow()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.notifications (type, source_id, target_id)
  VALUES ('follow', NEW.follower_id, NEW.following_id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_follow_trigger
AFTER INSERT ON public.follows
FOR EACH ROW
EXECUTE PROCEDURE public.notify_follow();

DROP FUNCTION IF EXISTS public.notify_review() CASCADE;
DROP TRIGGER IF EXISTS notify_review_trigger ON public.reviews;

CREATE FUNCTION public.notify_review()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.notifications (type, source_id, target_id, product_id)
  VALUES (
    'review',
    NEW.profile_id,
    (SELECT profile_id FROM public.products WHERE product_id = NEW.product_id),
    NEW.product_id
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_review_trigger
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE PROCEDURE public.notify_review();

DROP FUNCTION IF EXISTS public.notify_reply() CASCADE;
DROP TRIGGER IF EXISTS notify_reply_trigger ON public.post_replies;

CREATE FUNCTION public.notify_reply()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.notifications (type, source_id, target_id, post_id)
  VALUES (
    'reply',
    NEW.profile_id,
    (SELECT profile_id FROM public.posts WHERE post_id = NEW.post_id),
    NEW.post_id
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_reply_trigger
AFTER INSERT ON public.post_replies
FOR EACH ROW
EXECUTE PROCEDURE public.notify_reply();
