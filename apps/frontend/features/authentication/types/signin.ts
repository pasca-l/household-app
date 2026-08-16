type Email = {
  method: "email";
  email: string;
  password: string;
};

type Google = {
  method: "google";
};

export type SignIn = Email | Google;

export const isEmail = (obj: SignIn): obj is Email =>
  obj.method === "email" &&
  typeof (obj as Email).email === "string" &&
  typeof (obj as Email).password === "string";
