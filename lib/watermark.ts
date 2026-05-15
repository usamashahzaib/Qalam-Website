// Zero-width character fingerprinting
// Uses 4 invisible Unicode chars as base-4 digits (2 bits each)
const ZW = ['​', '‌', '‍', '⁠']

function fnv32(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h
}

function encodeBase4(n: number, digits: number): string {
  let r = ''
  for (let i = digits - 1; i >= 0; i--) r += ZW[(n >>> (i * 2)) & 3]
  return r
}

// Encode session ID + minute-resolution timestamp into 16 invisible chars
export function buildWatermark(sessionId: string): string {
  const sid = fnv32(sessionId) & 0xFFFF
  const ts = Math.floor(Date.now() / 60000) & 0xFFFF
  return encodeBase4(sid, 8) + encodeBase4(ts, 8)
}

// Full copyright block appended to clipboard on copy
// Fingerprint is embedded invisibly at the boundary — survives plain-text paste
export function buildCopyrightSuffix(sessionId: string): string {
  const fp = buildWatermark(sessionId)
  return (
    '\n\n' +
    '──────────────────────────────────────────────\n' +
    '© 2025 Qalam (byqalam.com). All rights reserved.\n' +
    'Unauthorized reproduction or redistribution is prohibited.\n' +
    'Terms: byqalam.com/terms' +
    '⁠' + fp + '​'
  )
}
