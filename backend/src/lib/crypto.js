import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;   // 128-bit IV for GCM
const TAG_LENGTH = 16;  // 128-bit auth tag

// Derive a 32-byte key from ENCRYPTION_SECRET using SHA-256
const getKey = () => {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) throw new Error("ENCRYPTION_SECRET env var is not set");
  return crypto.createHash("sha256").update(secret).digest();
};

/**
 * Encrypts a plain-text string.
 * Returns a hex string in the format:  iv:authTag:ciphertext
 */
export const encrypt = (plainText) => {
  if (!plainText) return plainText;
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
};

/**
 * Decrypts a hex string produced by encrypt().
 * Returns the original plain-text, or null on failure.
 */
export const decrypt = (encryptedText) => {
  if (!encryptedText) return encryptedText;
  // If the value does not contain ":" it is legacy plain-text – return as-is
  if (!encryptedText.includes(":")) return encryptedText;
  try {
    const [ivHex, authTagHex, cipherHex] = encryptedText.split(":");
    const key = getKey();
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const cipherText = Buffer.from(cipherHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);
    return decrypted.toString("utf8");
  } catch (err) {
    console.error("Decryption failed:", err.message);
    // Return the raw value so legacy messages don't break the app
    return encryptedText;
  }
};
