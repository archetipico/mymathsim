import type { CheckedState } from "@radix-ui/react-checkbox";
import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Col } from "./col";

interface DataProps {
  id: string;
  type: HTMLInputTypeAttribute;
  value: string | number | boolean | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onCheckedChange?: (checked: CheckedState) => void | undefined;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
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
  step,
}) => {
  return (
    <Col gap={2}>
      {label && <Label htmlFor={id}>{label}</Label>}

      {type === "color" && typeof value === "string" && onChange ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-12 rounded-full border-2 border-gray-300 transition-transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: value }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 rounded-2xl backdrop-blur-md bg-white/30 shadow-xl border border-white/40">
            <HexColorPicker
              color={value}
              onChange={(val) => onChange({ target: { value: val } } as any)}
              className="rounded-xl"
            />
            <Input
              className="mt-3 rounded-lg border focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 bg-white/40 backdrop-blur-sm"
              value={value}
              onChange={onChange}
            />
          </PopoverContent>
        </Popover>
      ) : type === "checkbox" &&
        typeof value === "boolean" &&
        onCheckedChange ? (
        <Checkbox id={id} checked={value} onCheckedChange={onCheckedChange} />
      ) : onChange ? (
        <Input
          id={id}
          type={type}
          min={min}
          max={max}
          step={step}
          value={value as any}
          onChange={onChange}
        />
      ) : null}
    </Col>
  );
};
