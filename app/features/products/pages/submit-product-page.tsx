import { useState } from "react";
import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import type { Route } from "./+types/submit-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your product" }
  ];
};

export default function SubmitPage() {
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setIcon(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <Hero
        title="Submit Your Product"
        subtitle="Share your product with the world"
      />
      <Form className="mx-auto grid max-w-screen-lg grid-cols-2 gap-10">
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your product"
            id="name"
            name="name"
            type="text"
            required
            placeholder="Name of your product"
          />
          <InputPair
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise description of your product"
          />
          <InputPair
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="url"
            placeholder="https://example.com"
          />
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            required
            type="text"
            placeholder="A detailed description of your product"
          />
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: "AI", value: "ai" },
              { label: "Design", value: "design" },
              { label: "Marketing", value: "marketing" },
              { label: "Development", value: "development" }
            ]}
          />
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="size-40 overflow-hidden rounded-xl shadow-xl">
            {icon ? (
              <img src={icon} className="h-full w-full object-cover" />
            ) : null}
          </div>
          <Label className="flex flex-col items-start gap-1">
            Icon
            <small className="text-muted-foreground">
              This is the icon of your product.
            </small>
          </Label>
          <Input
            type="file"
            className="w-1/2"
            onChange={onChange}
            required
            name="icon"
          />
          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground">
              Recommended size: 128x128px
            </span>
            <span className="text-muted-foreground">
              Allowed formats: PNG, JPEG
            </span>
            <span className="text-muted-foreground">Max file size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}
