import { DotIcon } from "lucide-react";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/job-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Job Details | wemake" }];
};

export default function JobPage() {
  return (
    <div>
      <div className="from-primary/80 to-primary/10 h-60 w-full rounded-lg bg-gradient-to-tr"></div>
      <div className="-mt-20 grid grid-cols-6 items-start gap-20">
        <div className="col-span-4 space-y-10">
          <div>
            <div className="relative left-10 size-40 overflow-hidden rounded-full bg-white">
              <img
                src="https://github.com/facebook.png"
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold">Software Engineer</h1>
            <h4 className="text-muted-foreground text-lg">Meta Inc.</h4>
          </div>
          <div className="flex gap-2">
            <Badge variant={"secondary"}>Full-time</Badge>
            <Badge variant={"secondary"}>Remote</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              This is a full-time remote position for a Software Engineer. We
              are looking for a skilled and experienced Software Engineer to
              join our team.
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="list-inside list-disc text-lg">
              {[
                "Design and implement scalable and efficient software solutions",
                "Collaborate with cross-functional teams to ensure timely delivery of projects",
                "Optimize software performance and troubleshoot issues"
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="list-inside list-disc text-lg">
              {[
                "Bachelor's degree in Computer Science or related field",
                "3+ years of experience in software development",
                "Strong proficiency in JavaScript, TypeScript, and React"
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="list-inside list-disc text-lg">
              {[
                "Competitive salary",
                "Flexible working hours",
                "Opportunity to work on cutting-edge projects"
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="list-inside list-disc text-lg">
              {["JavaScript", "TypeScript", "React"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sticky top-20 col-span-2 mt-32 space-y-5 rounded-lg border p-6">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Avg. Salary</span>
            <span className="text-2xl font-medium">$100,000 - $120,000</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Location</span>
            <span className="text-2xl font-medium">Remote</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Type</span>
            <span className="text-2xl font-medium">Full Time</span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground text-sm">
              Posted 2 days ago
            </span>
            <DotIcon className="size-4" />
            <span className="text-muted-foreground text-sm">395 views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
