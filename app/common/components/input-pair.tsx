import type { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function InputPair({
  label,
  description,
  textArea = false,
  ...rest
}: {
  label: string;
  description: string;
  textArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col space-y-2">
      <Label className="flex flex-col items-start gap-1" htmlFor={rest.id}>
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      {textArea ? (
        <Textarea className="resize-none" rows={4} {...rest} />
      ) : (
        <Input {...rest} />
      )}
    </div>
  );
}
