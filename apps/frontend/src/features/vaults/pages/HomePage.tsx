import { Spinner } from "shadcn-ui";
import { useNoteList } from "@/features/vaults/hooks/useNoteList";
import Vaults from "@/features/vaults/components/Vaults";

export default function HomePage() {
  const { noteList, isLoading } = useNoteList();

  return (
    <div className="p-4">
      {isLoading ? <Spinner /> : <Vaults noteList={noteList} />}
    </div>
  );
}
