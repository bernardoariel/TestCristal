// context/helper/typeLikeUser.ts
import { Locator } from '@playwright/test';

export async function typeLikeUser(input: Locator, value: string) {
  await input.click();
  await input.press('Control+A');
  await input.press('Backspace');
  await input.type(value, { delay: 30 }); // máscara/jQuery friendly
  await input.blur(); // dispara change en muchos plugins
}
