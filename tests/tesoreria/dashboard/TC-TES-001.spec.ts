import { test, expect } from '@playwright/test';

import { URLBASE } from '../../../context/data/server';
import { loginAdmin } from '../../../context/helper';
import { users } from '../../../context/data/users';

import { retirarTotalTesoreria } from '../helpers/tesoreria.retiro';

import { getSaldoCaja } from '../../caja/helpers/caja.modal';
import { getSaldoTesoreria } from '../helpers/tesoreria.modal';

import { esperar } from '../../../context/helper/espera';

import { setSaldoCajaObjetivo } from '../../caja/helpers/caja-saldo-inicial';
import { ingresarATesoreria } from '../helpers/tesoreria.ingreso';
import { extraerTodoCaja } from '../../caja/helpers/caja.extraer-todo';

test.describe.serial('Tesorería', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Login', async () => {
      await page.goto(`${URLBASE}/inicio`, { waitUntil: 'load' });
      await page.setViewportSize({ width: 1920, height: 1080 });

      await loginAdmin(page, {
        name: users.cristal.name,
        pass: users.cristal.pass,
      });
    });
  });

  test('TC-TES-001 | Ingresar Dinero a Tesorería', async ({ page }) => {

    // ----------------------------
    // PRECONDICIONES (todo en steps)
    // ----------------------------
    await test.step('Precondición | Caja en cero', async () => {
      await extraerTodoCaja(page, 'Inicio batería de tests');
      await page.reload();
    });

    await test.step('Precondición | Tesorería en cero', async () => {
      await retirarTotalTesoreria(page);
      await page.reload();
    });

    await test.step('Precondición | Caja en $72.100.000,00', async () => {
      await setSaldoCajaObjetivo(page, 72100000, {
        detalleIngreso: 'Inicio de batería de tests',
        conceptoExtraccion: 'Ajuste para iniciar tests',
        refreshSiNoCambia: true,
        timeoutSaldoMs: 30000,
      });
      await page.reload();
    });

    await test.step('Precondición | Tesorería en $72.000.000,00 y Caja en $100.000,00', async () => {
      await ingresarATesoreria(page, 72000000); // deja 100k en caja
      await page.reload();

      const { saldo: saldoCaja } = await getSaldoCaja(page);
      const { saldo: saldoTesoreria } = await getSaldoTesoreria(page);

      expect(saldoCaja).toBe(100000);
      expect(saldoTesoreria).toBe(72000000);

      test.info().annotations.push({
        type: 'precond',
        description: `Caja=${saldoCaja} | Tesorería=${saldoTesoreria}`,
      });
    });

    // ----------------------------
    // PASOS DEL CASO (TC)
    // ----------------------------

    await test.step('Paso 1 | Verificar Dashboard (Inicio)', async () => {
      await expect(page).toHaveURL(/\/inicio$/);
      // Si tenés un título o h1, mejor:
      // await expect(page.getByRole('heading', { name: 'Inicio' })).toBeVisible();
    });

    await test.step('Paso 2 | Verificar saldos iniciales', async () => {
      const { saldo: caja } = await getSaldoCaja(page);
      const { saldo: teso } = await getSaldoTesoreria(page);

      expect(caja).toBe(100000);
      expect(teso).toBe(72000000);

      test.info().annotations.push({
        type: 'info',
        description: `Inicial | Caja=${caja} Tesorería=${teso}`,
      });
    });

    await test.step('Paso 3-5 | Enviar $50.000 a tesorería desde Dashboard', async () => {
      const res = await ingresarATesoreria(page, 50000);
      // si tu helper devuelve ok / inputValue, lo podés anotar:
      test.info().annotations.push({
        type: 'info',
        description: `Enviar a tesorería resultado: ${JSON.stringify(res)}`,
      });

      await page.reload();
    });

    await test.step('Paso 6 | Verificar saldos finales', async () => {
      const { saldo: saldoCaja } = await getSaldoCaja(page);
      const { saldo: saldoTesoreria } = await getSaldoTesoreria(page);

      expect(saldoCaja).toBe(50000);
      expect(saldoTesoreria).toBe(72050000);

      test.info().annotations.push({
        type: 'info',
        description: `Final | Caja=${saldoCaja} Tesorería=${saldoTesoreria}`,
      });
    });

    await test.step('Paso 7 | Verificar movimiento en Caja (movimientos-caja)', async () => {
      await page.goto(`${URLBASE}/movimientos-caja`, { waitUntil: 'load' });

      // Tomo “primer registro” de la tabla (fila 1)
      // Ajustá selectores si tu grilla cambia. La idea: validar tipo, monto, concepto.
      await expect(page.getByRole('gridcell', { name: 'EGRESO' }).first()).toHaveText('EGRESO');
      // Verificar etiqueta roja (label-danger)
      await expect(page.getByRole('gridcell', { name: 'EGRESO' }).first().locator('span.label.label-danger')).toBeVisible();
      await expect(page.getByRole('gridcell', { name: '$ 50.000,00' }).first()).toBeVisible();
      await expect(page.getByRole('gridcell', { name: /Retiro para tesorería: ENVIO/i }).first()).toBeVisible();
    });

    await test.step('Paso 8 | Verificar movimiento en Tesorería (listar)', async () => {
      // botón "Listar" de tesorería (vos lo estabas haciendo nth(1))
      await page.getByRole('link', { name: ' Listar' }).nth(1).click();

      await expect(page.getByRole('gridcell', { name: 'INGRESO' }).first()).toHaveText('INGRESO');
      // Verificar etiqueta verde (label-success)
      await expect(page.getByRole('gridcell', { name: 'INGRESO' }).first().locator('span.label.label-success')).toBeVisible();
      await expect(page.getByRole('gridcell', { name: '$ 50.000,00' }).first()).toBeVisible();
      await expect(page.getByRole('gridcell', { name: /ENVIO A TESORERIA/i }).first()).toBeVisible();
    });

  });
});