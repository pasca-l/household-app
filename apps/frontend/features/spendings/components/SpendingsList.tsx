"use client";

import { Button, Spinner } from "shadcn-ui";
import { useSpendingsList } from "@/features/spendings/hooks/useSpendingsList";

export default function SpendingsList({
  handleSpendingsRoute,
}: {
  handleSpendingsRoute: (id: string) => void;
}) {
  const { spendingsList, isLoading } = useSpendingsList();

  return (
    <div className="flex flex-col gap-1">
      <p className="font-bold">List of Spendings</p>
      {isLoading ? (
        <Spinner />
      ) : (
        spendingsList.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className="justify-start"
            onClick={() => handleSpendingsRoute(item.id)}
          >
            {item.id}
          </Button>
        ))
      )}
    </div>
  );
}
