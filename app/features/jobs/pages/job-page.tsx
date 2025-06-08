import { DotIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getJobById } from "../queries";
import type { Route } from "./+types/job-page";

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: `${data.job.position} | wemake` }];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const job = await getJobById(client, { jobId: params.jobId });
  return { job };
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="from-primary/80 to-primary/10 h-60 w-full rounded-lg bg-gradient-to-tr"></div>
      <div className="-mt-20 grid grid-cols-6 items-start gap-20">
        <div className="col-span-4 space-y-10">
          <div>
            <div className="relative left-10 size-40 overflow-hidden rounded-full bg-white">
              <img src={loaderData.job.company_logo} className="object-cover" />
            </div>
            <h1 className="mt-5 text-4xl font-bold">
              {loaderData.job.position}
            </h1>
            <h4 className="text-muted-foreground text-lg">
              {loaderData.job.company_name}
            </h4>
          </div>
          <div className="flex gap-2 capitalize">
            <Badge variant={"secondary"}>{loaderData.job.job_type}</Badge>
            <Badge variant={"secondary"}>{loaderData.job.location}</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">{loaderData.job.overview}</p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="list-inside list-disc text-lg">
              {loaderData.job.responsibilities.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="list-inside list-disc text-lg">
              {loaderData.job.qualifications.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="list-inside list-disc text-lg">
              {loaderData.job.benefits.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="list-inside list-disc text-lg">
              {loaderData.job.skills.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sticky top-20 col-span-2 mt-32 space-y-5 rounded-lg border p-6">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Avg. Salary</span>
            <span className="text-2xl font-medium">
              {loaderData.job.salary_range}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Location</span>
            <span className="text-2xl font-medium capitalize">
              {loaderData.job.location}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Type</span>
            <span className="text-2xl font-medium capitalize">
              {loaderData.job.job_type}
            </span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground text-sm">
              Posted {DateTime.fromISO(loaderData.job.created_at).toRelative()}
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
