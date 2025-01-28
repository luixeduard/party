import { ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export function encrypt(data: string | number) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const crypto = require('crypto');
  const ENC_KEY = process.env.ENC_KEY;
  const IV = process.env.IV;
  const encrypt = (val: any) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
    const encrypted = cipher.update(val, 'utf8', 'base64');
    return encrypted + cipher.final('base64');
  };
  return encrypt(typeof data !== 'number' ? data : `${data}`);
}

export function encryptID(data?: string | number) {
  if (!data) {
    return undefined;
  }
  return encrypt(data);
}

export default function decrypt(data: string) {
  try {
    const crypto = require('crypto');
    const ENC_KEY = process.env.ENC_KEY;
    const IV = process.env.IV;
    const decrypt = (encrypted: string) => {
      let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
      let decrypted = decipher.update(encrypted, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    };
    return decrypt(data);
  } catch (err) {
    throw new ForbiddenException('No se pudo recuperar la información');
  }
}

export function decryptID(data?: string) {
  try {
    if (!data) {
      return undefined;
    }
    return decrypt(data);
  } catch (error) {
    throw new ForbiddenException('No se puede desencriptar el valor: ' + data);
  }
}
