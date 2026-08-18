import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shadcn-ui";
import ReceiptFormModal from "@/features/spendings/components/ReceiptFormModal";
import type { Receipt } from "@/features/spendings/types/receipt";

export default function ReceiptTable({
  receiptList,
}: {
  receiptList: Receipt[];
}) {
  const [selectedItem, setSelectedItem] = useState<Receipt | undefined>();
  const [showItemModal, setShowItemModal] = useState(false);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receiptList.map((item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedItem(item);
                setShowItemModal(true);
              }}
            >
              <TableCell>
                {item.purchase_date.toISOString().split("T")[0]}
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ReceiptFormModal
        item={selectedItem}
        showModal={showItemModal}
        setShowModal={setShowItemModal}
      />
    </>
  );
}
