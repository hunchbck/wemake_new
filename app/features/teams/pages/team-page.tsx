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
import type { Route } from "./+types/team-page";

export const meta: Route.MetaFunction = () => [
  { title: "Team Details | wemake" }
];

export default function TeamPage() {
  return (
    <div className="space-y-20">
      <Hero title="Join lynn's team" />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {[
            {
              title: "Product name",
              value: "Doggie Social"
            },
            {
              title: "Stage",
              value: "MVP"
            },
            {
              title: "Team size",
              value: 3
            },
            {
              title: "Available equity",
              value: 50
            }
          ].map((item) => (
            <Card>
              <CardHeader>
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0 text-2xl font-bold">
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
                  {[
                    "React Developer",
                    "Backend Developer",
                    "Product Manager",
                    "UI/UX Designer"
                  ].map((item) => (
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
                <p>
                  Doggie Social is a social media platform for dogs. It allows
                  dogs to connect with each other and share their experiences.
                </p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="col-span-2 space-y-5 rounded-lg border p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/inthetiger.png" />
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Lynn</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>
          <Form className="space-y-5">
            <InputPair
              label="Introduce yourself"
              description="Tell us about yourself"
              name="introduction"
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
