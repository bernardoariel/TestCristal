// tests/caja/helpers/caja.wait.ts
import { expect, Page } from '@playwright/test';
import { getSaldoCaja } from './caja.modal';


export async function waitSaldoCaja(page: Page, objetivo: number, tolerancia = 0.01, timeout = 15000) {
  await expect.poll(
    async () => {
      const { saldo } = await getSaldoCaja(page);
      return saldo;
    },
    { timeout }
  ).toBeCloseTo(objetivo, 2); // 2 decimales
}
