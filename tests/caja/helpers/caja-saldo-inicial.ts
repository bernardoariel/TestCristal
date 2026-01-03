// tests/caja/helpers/caja.saldo-objetivo.ts
import { expect, Page, test } from '@playwright/test';
import { getSaldoCaja } from './caja.modal';
import { ingresarDineroCaja, extraerDineroCaja } from './caja.movimientos';


type Options = {
  detalleIngreso?: string;
  conceptoExtraccion?: string;
  tolerancia?: number;         // default 0.01
  timeoutSaldoMs?: number;     // default 15000
  refreshSiNoCambia?: boolean; // default true
};

async function waitSaldoCajaObjetivo(
  page: Page,
  objetivo: number,
  tolerancia: number,
  timeoutSaldoMs: number
) {
  await expect.poll(
    async () => {
      const { saldo } = await getSaldoCaja(page);
      return Math.abs(saldo - objetivo);
    },
    { timeout: timeoutSaldoMs }
  ).toBeLessThanOrEqual(tolerancia);
}

export async function setSaldoCajaObjetivo(page: Page, objetivo: number, opts: Options = {}) {
  const tolerancia = opts.tolerancia ?? 0.01;
  const timeoutSaldoMs = opts.timeoutSaldoMs ?? 15000;
  const refreshSiNoCambia = opts.refreshSiNoCambia ?? true;

  return await test.step(`PRECONDICIÓN | Set saldo caja a ${objetivo}`, async () => {
    const { saldo: actual, saldoStr: actualStr } = await getSaldoCaja(page);
    const diff = +(objetivo - actual);

    if (Math.abs(diff) <= tolerancia) {
      test.info().annotations.push({
        type: 'info',
        description: `Caja ya estaba en el objetivo: ${actualStr} (${actual})`,
      });
      return { ok: true as const, actual, objetivo, accion: 'NINGUNA' as const, monto: 0, luego: actual };
    }

    // Falta saldo => ingresar
    if (diff > tolerancia) {
      await ingresarDineroCaja(page, diff, opts.detalleIngreso ?? 'Ajuste automático QA (ingreso)');

      try {
        await waitSaldoCajaObjetivo(page, objetivo, tolerancia, timeoutSaldoMs);
      } catch (e) {
        if (refreshSiNoCambia) {
          await page.reload();
          await waitSaldoCajaObjetivo(page, objetivo, tolerancia, timeoutSaldoMs);
        } else throw e;
      }

      const { saldo: luego, saldoStr: luegoStr } = await getSaldoCaja(page);
      test.info().annotations.push({
        type: 'info',
        description: `Ingreso realizado: +${diff}. Saldo: ${actualStr} -> ${luegoStr}`,
      });

      return { ok: true as const, actual, objetivo, accion: 'INGRESO' as const, monto: diff, luego };
    }

    // Sobra saldo => extraer
    const aExtraer = Math.abs(diff);

    const res = await extraerDineroCaja(page, aExtraer, opts.conceptoExtraccion ?? 'Ajuste automático QA (extracción)');
    if (!res.ok) {
      throw new Error(`No se pudo extraer para ajustar saldo. solicitado=${aExtraer}, saldo=${actual}`);
    }

    try {
      await waitSaldoCajaObjetivo(page, objetivo, tolerancia, timeoutSaldoMs);
    } catch (e) {
      if (refreshSiNoCambia) {
        await page.reload();
        await waitSaldoCajaObjetivo(page, objetivo, tolerancia, timeoutSaldoMs);
      } else throw e;
    }

    const { saldo: luego, saldoStr: luegoStr } = await getSaldoCaja(page);
    test.info().annotations.push({
      type: 'info',
      description: `Extracción realizada: -${aExtraer}. Saldo: ${actualStr} -> ${luegoStr}`,
    });

    return { ok: true as const, actual, objetivo, accion: 'EXTRACCION' as const, monto: aExtraer, luego };
  });
}