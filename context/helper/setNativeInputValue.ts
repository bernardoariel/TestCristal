import { Locator, Page } from '@playwright/test';

export async function setNativeInputValue(
  page: Page,
  input: Locator,
  value: string
) {
  await input.scrollIntoViewIfNeeded();
  await input.waitFor({ state: 'visible' });

  await input.evaluate((el: HTMLInputElement, v: string) => {
    // setter nativo real
    const proto = Object.getPrototypeOf(el);
    const desc = Object.getOwnPropertyDescriptor(proto, 'value');
    desc?.set?.call(el, v);

    // eventos que escucha jQuery
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));

    // muchas máscaras recalculan al perder foco
    el.blur();
  }, value);
}

// para montos: pasamos string "normal" sin miles
export function moneyToPlainString(monto: number) {
  // si querés 2 decimales: 72000000 -> "72000000.00"
  // si el sistema maneja enteros: devolvé "72000000"
  return String(monto);
}
