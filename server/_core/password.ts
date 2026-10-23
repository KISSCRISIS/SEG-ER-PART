import { randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const SCRYPT_COST = 16_384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;
const HASH_PREFIX = "scrypt";

function scrypt(password: string, salt: Buffer, keyLength: number, options: { N: number; r: number; p: number }) {
  return new Promise<Buffer>((resolve, reject) => {
    nodeScrypt(password, salt, keyLength, options, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH);
  const derivedKey = await scrypt(password, salt, KEY_LENGTH, {
    N: SCRYPT_COST,
    r: SCRYPT_BLOCK_SIZE,
    p: SCRYPT_PARALLELIZATION,
  });

  return [
    HASH_PREFIX,
    SCRYPT_COST,
    SCRYPT_BLOCK_SIZE,
    SCRYPT_PARALLELIZATION,
    salt.toString("base64url"),
    derivedKey.toString("base64url"),
  ].join("$");
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [prefix, costRaw, blockSizeRaw, parallelizationRaw, saltRaw, hashRaw] = storedHash.split("$");
  const cost = Number(costRaw);
  const blockSize = Number(blockSizeRaw);
  const parallelization = Number(parallelizationRaw);

  if (
    prefix !== HASH_PREFIX ||
    !Number.isInteger(cost) ||
    !Number.isInteger(blockSize) ||
    !Number.isInteger(parallelization) ||
    !saltRaw ||
    !hashRaw
  ) {
    return false;
  }

  try {
    const salt = Buffer.from(saltRaw, "base64url");
    const expected = Buffer.from(hashRaw, "base64url");
    const actual = await scrypt(password, salt, expected.length, {
      N: cost,
      r: blockSize,
      p: parallelization,
    });
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
