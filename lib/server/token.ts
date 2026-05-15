import { createHmac, timingSafeEqual } from "node:crypto"
import { env } from "@/lib/server/env"

const encodeBase64Url = (value: string) => Buffer.from(value).toString("base64url")
const decodeBase64Url = (value: string) => Buffer.from(value, "base64url").toString()

const sign = (encoded: string) =>
  createHmac("sha256", env.appSessionSecret).update(encoded).digest("base64url")

const safeEqual = (a: string, b: string) => {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export const createSignedToken = (payload: object): string => {
  const encoded = encodeBase64Url(JSON.stringify(payload))
  return `${encoded}.${sign(encoded)}`
}

export const readSignedToken = <T>(token: string, invalidErrorCode: string): T => {
  const [encoded, signature] = token.split(".")
  if (!encoded || !signature) throw new Error(invalidErrorCode)
  if (!safeEqual(signature, sign(encoded))) throw new Error(invalidErrorCode)
  return JSON.parse(decodeBase64Url(encoded)) as T
}
