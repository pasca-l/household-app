import {
  QueryDocumentSnapshot,
  Timestamp,
  FirestoreDataConverter,
} from "firebase/firestore";

export type AdditionalNote = { label: string; content: string };

export type Note = {
  id?: string;
  created_at: Date;
  updated_at: Date;
  label: string;
  url: string;
  username: string;
  password: string;
  other: AdditionalNote[];
};

export type NoteFirestore = {
  created_at: Timestamp;
  updated_at: Timestamp;
  label: string;
  url: string;
  username: string;
  password: string;
  other: AdditionalNote[];
};

export const noteConverter: FirestoreDataConverter<Note> = {
  toFirestore(note: Note): NoteFirestore {
    return {
      created_at: Timestamp.fromDate(note.created_at),
      updated_at: Timestamp.fromDate(note.updated_at),
      label: note.label,
      url: note.url,
      username: note.username,
      password: note.password,
      other: note.other,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Note {
    const data = snapshot.data() as NoteFirestore;
    return {
      created_at: data.created_at.toDate(),
      updated_at: data.updated_at.toDate(),
      label: data.label,
      url: data.url,
      username: data.username,
      password: data.password,
      other: data.other,
    };
  },
};
