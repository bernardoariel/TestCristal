import { Locator, Page, expect } from '@playwright/test';

export async function writeMontoMasked(
  page: Page,
  input: Locator,
  monto: number | string
) {
  const txt = typeof monto === 'number' ? String(monto) : monto;

  await input.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // tipeo humano
  await page.keyboard.type(txt, { delay: 25 });

  // 🔥 clave: forzar input por si el plugin no lo dispara con playwright
  await input.dispatchEvent('input');

  // blur para que recalculen validaciones
  await page.keyboard.press('Tab');

  // debug
  return (await input.inputValue()).trim();
}
