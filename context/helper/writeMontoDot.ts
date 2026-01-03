// context/helper/writeMontoDot.ts
import { Locator } from '@playwright/test';

export async function writeMontoDot(input: Locator, monto: number) {
  const v = monto.toFixed(2); // "72099997.19"
  await input.click();
  await input.press('Control+A');
  await input.press('Backspace');
  await input.type(v, { delay: 10 });
  await input.blur();
}
