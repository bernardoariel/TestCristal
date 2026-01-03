import { test, expect, Page } from '@playwright/test';


import { openRetiroTesoreriaModal } from './tesoreria.modal';
import { moneyToPlainString, setNativeInputValue } from '../../../context/helper/setNativeInputValue';


export async function retirarTotalTesoreria(page: Page) {
  return await test.step('Tesorería | Retirar total (si hay saldo)', async () => {
    const { btnRetirar, monto } = await openRetiroTesoreriaModal(page);

    if (monto <= 0) {
      test.info().annotations.push({ type: 'info', description: 'Tesorería ya estaba en cero' });
      return { monto, retirado: false };
    }

    await expect(btnRetirar).toBeEnabled({ timeout: 10000 });
    await btnRetirar.click();

    return { monto, retirado: true };
  });
}

type RetiroMontoResult =
  | { ok: true; solicitado: number; disponible: number; inputValue: string }
  | { ok: false; solicitado: number; disponible: number; inputValue: string };

export async function retirarMontoTesoreria(page: Page, solicitado: number): Promise<RetiroMontoResult> {
  return await test.step(`Tesorería | Retirar ${solicitado}`, async () => {
    const { inputMonto, btnRetirar, monto: disponible } = await openRetiroTesoreriaModal(page);

    // ✅ setter nativo + input/change + blur
    await setNativeInputValue(page, inputMonto, moneyToPlainString(solicitado));
    const quedo = await inputMonto.inputValue();

    if (solicitado > disponible) {
      await expect(btnRetirar).toBeDisabled({ timeout: 10000 });
      return { ok: false, solicitado, disponible, inputValue: quedo };
    }

    await expect(btnRetirar).toBeEnabled({ timeout: 10000 });
    await btnRetirar.click();

    return { ok: true, solicitado, disponible, inputValue: quedo };
  });
}
export async function validarRetiroDisabledSiSupera(page: Page, solicitado: number) {
  return await test.step(`Tesorería | Validar disabled si supera: ${solicitado}`, async () => {
    const { inputMonto, btnRetirar, monto: disponible } = await openRetiroTesoreriaModal(page);

    await setNativeInputValue(page, inputMonto, moneyToPlainString(solicitado));

    await expect(btnRetirar).toBeDisabled({ timeout: 10000 });
    return { solicitado, disponible };
  });
}