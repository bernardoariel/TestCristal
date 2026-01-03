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


test.describe.serial('Page Inicio', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${URLBASE}/inicio`);
    await page.setViewportSize({ width: 1920, height: 1080 });

    await loginAdmin(page, {
      name: users.cristal.name,
      pass: users.cristal.pass,
    });
  });

  test('PRECONDICIÓN | Setup completo', async ({ page }) => {
    // 1) Caja en cero
    await extraerTodoCaja(page, 'Inicio batería de tests');
    await page.reload();

    // 2) Tesorería en cero
   await retirarTotalTesoreria(page);
   await page.reload();

    // 3) Caja exactamente en 72.100.000
   await setSaldoCajaObjetivo(page, 72100000, {
      detalleIngreso: 'Inicio de batería de tests',
      conceptoExtraccion: 'Ajuste para iniciar tests',
      refreshSiNoCambia: true,
      timeoutSaldoMs: 30000,
    }); 
    await page.reload();

    // 4) Mover 72.000.000 de caja a tesorería
    await ingresarATesoreria(page, 72000000);
    await ingresarATesoreria(page, 50000);
    // si querés, logueá el resultado
    // console.log(res);

    await page.reload();

    const { saldo: saldoCaja } = await getSaldoCaja(page);
    expect(saldoCaja).toBe(50000);

    const { saldo: saldoTesoreria } = await getSaldoTesoreria(page);
    expect(saldoTesoreria).toBe(72050000);
    
    // Navegar usando URL completa para evitar rutas relativas que fallan
    await page.goto(`${URLBASE}/movimientos-caja`, { waitUntil: 'load' });
    console.log('url',`${URLBASE}/movimientos-caja`)
    // Esperar un poco con el helper antes de terminar
    await esperar(page, 2000);
    // Verificar movimiento en Movimientos de caja (último registro)
    // Resultado Esperado: Tipo: EGRESO, Monto: $50.000,00, Concepto: "Retiro para tesorería: ENVIO A TESORERIA"
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.getByRole('gridcell', { name: '/01/2026 19:56:06' }).click();
    await page.getByRole('gridcell', { name: '/01/2026 19:56:06' }).click();
    await page.getByRole('gridcell', { name: 'EGRESO' }).first().click();
    await expect(page.getByRole('gridcell', { name: 'EGRESO' }).first()).toHaveText('EGRESO');
    await page.getByRole('gridcell', { name: '$' }).first().click();
    await page.getByRole('gridcell', { name: 'Retiro para tesorería: ENVIO' }).first().click();
    await expect(page.getByRole('gridcell', { name: '$ 50.000,00' }).first()).toBeVisible();

    // Paso 8: Verificar Movimiento en Tesorería
    // Hacer clic en el boton "Listar de Tesorería"
    await page.getByRole('link', { name: ' Listar' }).nth(1).click();
    // En la tabla de movimientos de tesorería, buscar el último registro
    await page.getByRole('gridcell', { name: '1', exact: true }).click();
    await page.getByRole('gridcell', { name: 'INGRESO' }).first().click();
    await expect(page.getByRole('gridcell', { name: 'INGRESO' }).first()).toHaveText('INGRESO');
    await page.getByRole('gridcell', { name: '$ 50.000,00' }).click();
    await expect(page.getByRole('gridcell', { name: '$ 50.000,00' }).first()).toBeVisible();
    await page.getByRole('gridcell', { name: 'ENVIO A TESORERIA' }).first().click();

    // Cerrar la página explícitamente (opcional)
    await page.close();
  });

});