import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardFormProps = {
  children: React.ReactNode;
  cardTitle: string;
  cardDescription?: string;
  cardSize?: string;
};

export default function CardForm({
  children,
  cardTitle,
  cardDescription,
  cardSize,
}: CardFormProps) {
  return (
    <div className={`w-full ${cardSize ? cardSize : "max-w-sm"}`}>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{cardTitle}</CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
