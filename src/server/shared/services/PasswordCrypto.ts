import { genSalt, hash, compare } from "bcryptjs"

const SALT_RANDOMS = 8;

const hashPassword = async (password: string) => {
  const saltGenerate = await genSalt(SALT_RANDOMS);

  return await hash(password, saltGenerate);
}

const verifyPassword = async (password: string, hashPassword: string) => {
  return await compare(password, hashPassword);
}

export const PasswordCrypito  = {
  hashPassword,
  verifyPassword
}
