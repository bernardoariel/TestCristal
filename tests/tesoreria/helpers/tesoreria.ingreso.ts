// tests/tesoreria/helpers/tesoreria.ingreso.ts
import { expect, Page, test } from '@playwright/test';
import { getSaldoCaja } from '../../caja/helpers/caja.modal';
import { openIngresarTesoreriaModal } from './tesoreria.modal';
import { moneyToPlainString, setNativeInputValue } from '../../../context/helper/setNativeInputValue';


export async function ingresarATesoreria(page: Page, monto: number) {
  return await test.step(`Tesorería | Enviar a tesorería ${monto}`, async () => {
    const { saldo: saldoCajaAntes } = await getSaldoCaja(page);
    const { modal, inputMonto, help, btnEnviar } = await openIngresarTesoreriaModal(page);

    if (saldoCajaAntes <= 0) {
      await expect(btnEnviar).toBeDisabled();
      return { ok: false as const, reason: 'SIN_SALDO_CAJA', saldoCajaAntes, monto };
    }

    // ✅ UNIFICADO
    await setNativeInputValue(page, inputMonto, moneyToPlainString(monto));

    // opcional debug
    const quedo = await inputMonto.inputValue();
    test.info().annotations.push({ type: 'info', description: `inputValue="${quedo}"` });

    await expect(btnEnviar).toBeEnabled({ timeout: 10000 });
    await btnEnviar.click();
    await expect(modal).not.toBeVisible({ timeout: 15000 });

    const msg = (await help.textContent())?.trim() ?? '';
    return { ok: true as const, saldoCajaAntes, monto, inputValue: quedo, help: msg };
  });
}