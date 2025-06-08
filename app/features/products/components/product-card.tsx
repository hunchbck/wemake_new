import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";

interface ProductCardProps {
  id: number | string;
  name: string;
  description: string;
  reviewsCount: string;
  viewsCount: string;
  votesCount: string;
}

export function ProductCard({
  id,
  name,
  description,
  reviewsCount,
  viewsCount,
  votesCount
}: ProductCardProps) {
  return (
    <Link className="block" to={`/products/${id}`}>
      <Card className="hover:bg-card/50 flex w-full items-center justify-between bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl leading-none font-semibold tracking-tight">
            {name}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
          <div className="mt-2 flex items-center gap-4">
            <div className="text-muted-foreground flex items-center gap-px text-xs">
              <MessageCircleIcon className="h-4 w-4" />
              <span>{reviewsCount}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-px text-xs">
              <EyeIcon className="h-4 w-4" />
              <span>{viewsCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="py-0">
          <Button className="flex h-14 flex-col" variant="outline">
            <ChevronUpIcon className="size-4 shrink-0" />
            <span>{votesCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
