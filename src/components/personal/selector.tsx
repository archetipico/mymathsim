import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Col } from "./col";

interface SelectorItemProps {
  value: string;
  label: string;
}

interface SelectorProps {
  label?: string;
  value: string;
  icon?: React.ReactNode;
  placeholder?: string;
  onValueChange: ((value: string) => void) | undefined;
  items: SelectorItemProps[];
}

export const Selector: React.FC<SelectorProps> = ({
  label,
  value,
  icon,
  placeholder,
  onValueChange,
  items,
}) => {
  return (
    <Col>
      {label && <Label>{label}</Label>}

      <Select value={value} onValueChange={onValueChange}>
        {(icon || placeholder) && (
          <SelectTrigger className="w-full">
            {icon}
            {placeholder && <SelectValue placeholder={placeholder} />}
          </SelectTrigger>
        )}

        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Col>
  );
};
