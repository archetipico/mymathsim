import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Col } from "./col";
import { Checkbox } from "../ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";

interface DataProps {
  id: string;
  type: HTMLInputTypeAttribute;
  value: string | number | boolean | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onCheckedChange?: (checked: CheckedState) => void | undefined;
  label: string;
  min?: number;
  max?: number;
}

export const Data: React.FC<DataProps> = ({
  id,
  type,
  value,
  onChange,
  onCheckedChange,
  label,
  min,
  max,
}) => {
  return (
    <Col gap={2}>
      <Label htmlFor={id}>{label}</Label>

      {type !== "checkbox" && typeof value !== "boolean" && onChange && (
        <Input
          id={id}
          type={type}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
        />
      )}

      {type === "checkbox" && typeof value === "boolean" && onCheckedChange && (
        <Checkbox id={id} checked={value} onCheckedChange={onCheckedChange} />
      )}
    </Col>
  );
};
