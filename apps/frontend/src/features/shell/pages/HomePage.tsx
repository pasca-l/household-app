import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
  Spinner,
} from "shadcn-ui";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";
import { useSpendingsList } from "@/features/spendings/hooks/useSpendingsList";
import { useVaultList } from "@/features/vaults/hooks/useVaultList";
import AuthenticationForm from "@/features/authentication/components/AuthenticationForm";

export default function HomePage() {
  const { user } = useFirebaseAuth();
  const { spendingsList, isLoading: spendingsLoading } = useSpendingsList();
  const { vaultList, isLoading: vaultLoading } = useVaultList();

  return (
    <div className="p-4">
      {user ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Household App</h1>
          <div className="flex flex-col gap-1">
            <p>{user.email}</p>
            <p className="text-sm text-muted-foreground">{user.uid}</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Spendings</CardTitle>
            </CardHeader>
            <CardContent>
              {spendingsLoading ? (
                <Spinner />
              ) : (
                <ItemGroup className="gap-0">
                  {spendingsList.map((item) => (
                    <Item
                      key={item.id}
                      render={<Link to={`/spendings/${item.id}`} />}
                    >
                      <ItemContent>
                        <ItemTitle>{item.id}</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Vaults</CardTitle>
            </CardHeader>
            <CardContent>
              {vaultLoading ? (
                <Spinner />
              ) : (
                <ItemGroup className="gap-0">
                  {vaultList.map((item) => (
                    <Item
                      key={item.id}
                      render={<Link to={`/vaults/${item.id}`} />}
                    >
                      <ItemContent>
                        <ItemTitle>{item.id}</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="mx-auto flex max-w-sm flex-col gap-4 pt-16">
          <h1 className="text-center text-2xl font-semibold">
            Household App
          </h1>
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <CardContent>
              <AuthenticationForm />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
