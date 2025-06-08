import { DateTime } from "luxon";
import { Link } from "react-router";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";

interface JobCardProps {
  id: number;
  company: string;
  companyLogoUrl: string;
  companyHq: string;
  title: string;
  postedAt: string;
  type: string;
  positionLocation: string;
  salary: string;
}

export function JobCard({
  id,
  company,
  companyLogoUrl,
  companyHq,
  title,
  postedAt,
  type,
  positionLocation,
  salary
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="hover:bg-card/50 bg-transparent transition-colors">
        <CardHeader>
          <div className="mb-4 flex items-center gap-4">
            <img
              alt={`${company} Logo`}
              className="size-10 rounded-full"
              src={companyLogoUrl}
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{company}</span>
              <span className="text-muted-foreground text-xs">
                {DateTime.fromISO(postedAt).toRelative()}
              </span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="capitalize">
            {type}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {positionLocation}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium">
              {salary}
            </span>

            <span className="text-muted-foreground text-sm font-medium">
              {companyHq}
            </span>
          </div>
          <Button size="sm" variant="secondary">
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
