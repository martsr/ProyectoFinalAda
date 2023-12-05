import { createHash } from "node:crypto";
import crypto from "node:crypto";
import { PEPPER } from "../constants";
const addSalt = () => crypto.randomUUID();

const getSHA512OfPassword = (password: string, salt = addSalt()) => {
  console.log(salt);
  const hashedPassword = createHash("sha512")
    .update(salt + PEPPER + password)
    .digest("hex");
  return `${salt}:${hashedPassword}`;
};

export { getSHA512OfPassword };
