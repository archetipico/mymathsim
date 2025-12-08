import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  head?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
}

export const AppCard: React.FC<AppCardProps> = ({
  head,
  description,
  children,
  footer,
  actions,
  className,
  ...props
}) => {
  return (
    <Card
      className={cn(
        "rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer py-6 px-4",
        className
      )}
      {...props}
    >
      {(head || description) && (
        <CardHeader>
          {head && (
            <CardTitle className="text-xl font-semibold">{head}</CardTitle>
          )}
          {description && (
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}

      {children && <CardContent>{children}</CardContent>}

      {actions && (
        <CardFooter className="flex flex-wrap justify-end gap-2 pt-2 border-t border-border">
          {actions}
        </CardFooter>
      )}

      {footer && !actions && (
        <CardFooter className="pt-2 border-t border-border">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
