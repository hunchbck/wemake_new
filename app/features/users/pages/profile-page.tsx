import { useOutletContext } from "react-router";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/profile-page";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  await client.rpc("track_event", {
    event_type: "profile_view",
    event_data: {
      username: params.username
    }
  });
  return null;
};

export default function ProfilePage() {
  const { headline, bio } = useOutletContext<{
    headline: string;
    bio: string;
  }>();
  return (
    <div className="flex max-w-screen-md flex-col space-y-10">
      <div className="space-y-2">
        <p className="text-muted-foreground">{headline}</p>
        <p className="text-muted-foreground">
          I'm a product designer based on the UK, I like doing product design,
          design systems and design tokens.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Bio</h4>
        <p className="text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}
