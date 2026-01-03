// context/helper/montoWriters.ts
import { Locator } from '@playwright/test';
import { typeLikeUser } from './typeLikeUser';

export function formatMontoAR(n: number) {
  const fixed = n.toFixed(2);
  const [i, d] = fixed.split('.');
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${withThousands},${d}`;
}

export async function writeMontoNormal(input: Locator, monto: number) {
  await typeLikeUser(input, formatMontoAR(monto));
}

export async function writeMontoCentavosImplicitos(input: Locator, monto: number) {
  const centavos = Math.floor(monto * 100); // string SOLO dígitos
  await typeLikeUser(input, String(centavos));
}
