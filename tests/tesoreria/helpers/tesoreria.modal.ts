
import { expect, Locator, Page } from '@playwright/test';
import { openModalByTarget } from '../../../context/helper/openModal';
import { parseMontoArg } from '../../../context/helper/parseMontoArg';


export async function openRetiroTesoreriaModal(page: Page) {
  const modal = await openModalByTarget(page, '#modalRetirarTesoreria');

  const inputMonto = modal.locator('input[name="monto"], #montoRetirarTesoreria').first();
  await expect(inputMonto).toBeVisible();

  const btnRetirar = modal.locator('#btnRetirarTesoreria, button:has-text("Retirar de Tesorería")').first();
  await expect(btnRetirar).toBeVisible();

  // ✅ leer valor real del input
  const montoStr = (await inputMonto.inputValue())?.trim() ?? '0';
  const monto = parseMontoArg(montoStr);

  return { modal, inputMonto, btnRetirar, montoStr, monto };
}


export async function openIngresarTesoreriaModal(page: Page) {
  const modal = await openModalByTarget(page, '#modalIngresarTesoreria');

  const form = modal.locator('#formEnviarTesoreria');
  await expect(form).toBeVisible();

  const inputMonto = form.locator('input[name="monto"]');
  const help = form.locator('#ayudaEnviarTesoreria');
  const btnEnviar = form.locator('button.btn.btn-primary[type="submit"]');

  await expect(inputMonto).toBeVisible();
  await expect(btnEnviar).toBeVisible();

  return { modal, form, inputMonto, help, btnEnviar };
}

export async function getSaldoTesoreria(page: Page) {
  // Buscar la tarjeta que contiene el texto 'Tesorería' y tomar su h3 con el monto
  const card = page.locator('div:has-text("Tesorería")').first();
  const h3 = card.locator('h3').first();
  await expect(h3).toBeVisible();

  const saldoStr = (await h3.textContent())?.trim() ?? '';
  const saldo = parseMontoArg(saldoStr);

  return { saldoStr, saldo };
}