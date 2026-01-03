// tests/caja/helpers/caja.movimientos.ts
import { expect, Page, test } from '@playwright/test';
import { openIngresarCajaModal, openExtraerCajaModal } from './caja.modal';
import { parseMontoArg } from '../../../context/helper/parseMontoArg';
import { moneyToPlainString, setNativeInputValue } from '../../../context/helper/setNativeInputValue';


export async function ingresarDineroCaja(page: Page, monto: number, detalle = 'Ingreso automático QA') {
  return await test.step(`Caja | Ingresar $${monto}`, async () => {
    const { saldo: saldoAntes } = await getSaldoCaja(page);
    const { inputMonto, inputDetalle, btnSubmit } = await openIngresarCajaModal(page);

    await setNativeInputValue(page, inputMonto, moneyToPlainString(monto));
    await setNativeInputValue(page, inputDetalle, detalle);

    await expect(btnSubmit).toBeEnabled({ timeout: 10000 });
    await btnSubmit.click();

    return { ok: true as const, saldoAntes, monto };
  });
}

export async function extraerDineroCaja(page: Page, monto: number, concepto = 'Extracción automática QA') {
  return await test.step(`Caja | Extraer $${monto}`, async () => {
    const { saldo: saldoAntes } = await getSaldoCaja(page);
    const { inputMonto, inputConcepto, btnSubmit } = await openExtraerCajaModal(page);

    // Si intentás extraer más que el saldo, tu UI debería bloquear => devolvemos ok:false
    if (monto > saldoAntes) {
      await setNativeInputValue(page, inputMonto, moneyToPlainString(monto));
      await setNativeInputValue(page, inputConcepto, concepto);
      await expect(btnSubmit).toBeDisabled({ timeout: 10000 });
      return { ok: false as const, saldoAntes, solicitado: monto };
    }

    await setNativeInputValue(page, inputMonto, moneyToPlainString(monto));
    await setNativeInputValue(page, inputConcepto, concepto);

    await expect(btnSubmit).toBeEnabled({ timeout: 10000 });
    await btnSubmit.click();

    return { ok: true as const, saldoAntes, monto };
  });
}


export async function getSaldoCaja(page: Page) {
  const h3 = page.locator(
    'body > div.wrapper > div.content-wrapper > section.content > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div.inner > h3'
  );

  await expect(h3).toBeVisible();

  const saldoStr = (await h3.textContent())?.trim() ?? '';
  const saldo = parseMontoArg(saldoStr);

  return { saldoStr, saldo };
}

export async function haySaldoEnCaja(page: Page) {
  const { saldo } = await getSaldoCaja(page);
  return saldo > 0;
}


export async function ensureCajaConSaldo(page: Page, minimo = 1, ingresarSiFalta = 1000) {
  return await test.step(`PRECONDICIÓN | Asegurar caja con saldo >= ${minimo}`, async () => {
    const { saldo } = await getSaldoCaja(page);

    if (saldo >= minimo) {
      test.info().annotations.push({
        type: 'info',
        description: `Caja ya tenía saldo: ${saldo}`,
      });
      return { ok: true as const, saldoInicial: saldo, ingresoRealizado: 0 };
    }

    await ingresarDineroCaja(page, ingresarSiFalta, 'Carga automática QA (saldo insuficiente)');
    const { saldo: saldoLuego } = await getSaldoCaja(page);

    return { ok: true as const, saldoInicial: saldo, ingresoRealizado: ingresarSiFalta, saldoLuego };
  });
}