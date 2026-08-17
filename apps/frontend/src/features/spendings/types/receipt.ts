import {
  Timestamp,
  type QueryDocumentSnapshot,
  type FirestoreDataConverter,
} from "firebase/firestore";
import type { Category } from "@/features/spendings/types/category";

export type Receipt = {
  id?: string;
  created_at: Date;
  updated_at: Date;
  category: Category;
  value: number;
  purchase_date: Date;
};

export type ReceiptFirestore = {
  created_at: Timestamp;
  updated_at: Timestamp;
  category: string;
  value: number;
  purchase_date: Timestamp;
};

export const receiptConverter: FirestoreDataConverter<Receipt> = {
  toFirestore(receipt: Receipt): ReceiptFirestore {
    return {
      created_at: Timestamp.fromDate(receipt.created_at),
      updated_at: Timestamp.fromDate(receipt.updated_at),
      category: receipt.category,
      value: receipt.value,
      purchase_date: Timestamp.fromDate(receipt.purchase_date),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Receipt {
    const data = snapshot.data() as ReceiptFirestore;
    return {
      created_at: data.created_at.toDate(),
      updated_at: data.updated_at.toDate(),
      category: data.category as Category,
      value: data.value,
      purchase_date: data.purchase_date.toDate(),
    };
  },
};
