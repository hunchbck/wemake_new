import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import { makeSSRClient } from "~/supa-client";
import { getTeamById } from "../queries";
import type { Route } from "./+types/team-page";

export const meta: Route.MetaFunction = () => [
  { title: "Team Details | wemake" }
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const team = await getTeamById(client, { teamId: params.teamId });
  return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title={`Join ${loaderData.team.team_leader.name}'s team`} />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {[
            {
              title: "Product name",
              value: loaderData.team.product_name
            },
            {
              title: "Stage",
              value: loaderData.team.product_stage
            },
            {
              title: "Team size",
              value: loaderData.team.team_size
            },
            {
              title: "Available equity",
              value: loaderData.team.equity_split
            }
          ].map((item) => (
            <Card>
              <CardHeader>
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0 text-2xl font-bold capitalize">
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Looking for
              </CardTitle>
              <CardContent className="p-0 text-2xl font-bold">
                <ul className="list-inside list-disc text-lg">
                  {loaderData.team.roles.split(",").map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Idea description
              </CardTitle>
              <CardContent className="p-0 text-xl font-medium">
                <p>{loaderData.team.product_description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="col-span-2 space-y-5 rounded-lg border p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>
                {loaderData.team.team_leader.name[0]}
              </AvatarFallback>
              {loaderData.team.team_leader.avatar ? (
                <AvatarImage src={loaderData.team.team_leader.avatar} />
              ) : null}
            </Avatar>
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-medium">
                {loaderData.team.team_leader.name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.team.team_leader.role}
              </Badge>
            </div>
          </div>
          <Form
            className="space-y-5"
            method="post"
            action={`/users/${loaderData.team.team_leader.username}/messages`}
          >
            <InputPair
              label="Introduce yourself"
              description="Tell us about yourself"
              name="content"
              type="text"
              id="introduction"
              required
              textArea
              placeholder="i.e. I'm a React Developer with 3 years of experience"
            />
            <Button type="submit" className="w-full">
              Get in touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
