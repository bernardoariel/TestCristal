// context/helper/writeMontoCommaNoThousands.ts
import { Locator } from '@playwright/test';

export async function writeMontoCommaNoThousands(input: Locator, monto: number) {
  const v = monto.toFixed(2).replace('.', ','); // "72099997,19"

  await input.click();
  await input.press('Control+A');
  await input.press('Backspace');

  // IMPORTANT: type, no fill (máscara)
  await input.type(v, { delay: 10 });

  // disparar eventos típicos
  await input.dispatchEvent('input');
  await input.dispatchEvent('change');
  await input.blur();
}
