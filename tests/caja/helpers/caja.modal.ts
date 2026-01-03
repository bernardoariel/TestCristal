// tests/caja/helpers/caja.modal.ts
import { expect, Locator, Page } from '@playwright/test';
import { openModalByTarget } from '../../../context/helper/openModal';
import { parseMontoArg } from '../../../context/helper/parseMontoArg';


export async function getSaldoCaja(page: Page) {
  // El H3 con $... (dejé tu selector tal cual, pero si después lo podés hacer más estable, mejor)
  const h3 = page.locator(
    'body > div.wrapper > div.content-wrapper > section.content > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div.inner > h3'
  );
  await expect(h3).toBeVisible();

  const saldoStr = (await h3.textContent())?.trim() ?? '';
  const saldo = parseMontoArg(saldoStr);

  return { saldoStr, saldo };
}

export async function openIngresarCajaModal(page: Page) {
  const modal = await openModalByTarget(page, '#modalIngresar'); // Bootstrap 3 => "in" ya lo maneja tu helper

  const inputMonto = modal.locator('#formIngresar input').first(); // tu selector: #formIngresar > div.modal-body > div:nth-child(1) > input
  const inputDetalle = modal.locator('#formIngresar div.modal-body input').nth(1); // tu selector: ...nth-child(2) > input
  const btnSubmit = modal.locator('#formIngresar button.btn.btn-success');

  await expect(inputMonto).toBeVisible();
  await expect(inputDetalle).toBeVisible();
  await expect(btnSubmit).toBeVisible();

  return { modal, inputMonto, inputDetalle, btnSubmit };
}

export async function openExtraerCajaModal(page: Page) {
  const modal = await openModalByTarget(page, '#modalExtraer');
  const form = modal.locator('#formExtraer');

  const inputMonto = form.locator('#montoExtraer'); // ✅ este
  const inputConcepto = form.locator('input[name="concepto"]');
  const btnSubmit = form.locator('button.btn.btn-danger[type="submit"]');

  await expect(inputMonto).toBeVisible();
  return { modal, inputMonto, inputConcepto, btnSubmit };
}
