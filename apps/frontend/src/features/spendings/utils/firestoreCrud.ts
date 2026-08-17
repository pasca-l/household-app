import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FIRESTORE } from "@/lib/firebase/firebaseConfig";
import { receiptConverter, type Receipt } from "@/features/spendings/types/receipt";

export const addFirestoreDoc = async (spendingsId: string, receipt: Receipt) =>
  addDoc(
    collection(FIRESTORE, `spendings/${spendingsId}/receipts`).withConverter(
      receiptConverter,
    ),
    receipt,
  );

export const updateFirestoreDoc = async (
  spendingsId: string,
  receipt: Receipt,
) => {
  if (typeof receipt.id === "string") {
    return updateDoc(
      doc(
        FIRESTORE,
        `spendings/${spendingsId}/receipts`,
        receipt.id,
      ).withConverter(receiptConverter),
      receipt,
    );
  }
};

export const deleteFirestoreDoc = async (
  spendingsId: string,
  receipt: Receipt,
) => {
  if (typeof receipt.id === "string") {
    return deleteDoc(
      doc(FIRESTORE, `spendings/${spendingsId}/receipts`, receipt.id),
    );
  }
};
