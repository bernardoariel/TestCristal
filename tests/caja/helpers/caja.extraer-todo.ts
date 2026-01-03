// tests/caja/helpers/caja.extraer-todo.ts
import { expect, Page, test } from '@playwright/test';
import { getSaldoCaja, openExtraerCajaModal } from './caja.modal';
import { moneyToPlainString, setNativeInputValue } from '../../../context/helper/setNativeInputValue';

async function waitSaldoCaja(page: Page, objetivo: number, timeoutMs = 15000) {
  await expect.poll(async () => (await getSaldoCaja(page)).saldo, { timeout: timeoutMs })
    .toBeCloseTo(objetivo, 2);
}

export async function extraerTodoCaja(
  page: Page,
  concepto = 'Vaciado de caja (QA)',
  opts?: { timeoutSaldoMs?: number; refreshSiNoCambia?: boolean }
) {
  const timeoutSaldoMs = opts?.timeoutSaldoMs ?? 15000;
  const refreshSiNoCambia = opts?.refreshSiNoCambia ?? true;

  return await test.step('Caja | Extraer TODO (dejar en cero)', async () => {
    const { saldo: actual, saldoStr } = await getSaldoCaja(page);

    if (actual <= 0) {
      test.info().annotations.push({ type: 'info', description: 'Caja ya estaba en cero' });
      return { ok: true as const, extraido: 0, saldoAntes: actual };
    }

    const { inputMonto, inputConcepto, btnSubmit } = await openExtraerCajaModal(page);

    // ✅ UNIFICADO (sin fill)
    await setNativeInputValue(page, inputMonto, moneyToPlainString(actual));
    await setNativeInputValue(page, inputConcepto, concepto);

    await expect(btnSubmit).toBeEnabled({ timeout: 10000 });
    await btnSubmit.click();

    try {
      await waitSaldoCaja(page, 0, timeoutSaldoMs);
    } catch (e) {
      if (refreshSiNoCambia) {
        await page.reload();
        await waitSaldoCaja(page, 0, timeoutSaldoMs);
      } else {
        throw e;
      }
    }

    test.info().annotations.push({
      type: 'info',
      description: `Caja vaciada: ${saldoStr} -> $0,00`,
    });

    return { ok: true as const, extraido: actual, saldoAntes: actual };
  });
}