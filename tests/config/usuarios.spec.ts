import { test, expect } from '@playwright/test';
import { esperar, loginAdmin } from '../../context/helper';
import { users } from '../../context/data/users';
import { URLBASE } from '../../context/data/server';
import { describe } from 'node:test';

describe('Page Inicio', () => {
  test.beforeEach('Contectarme a la web', async ({ page }) => {
    await page.goto(URLBASE);
    // Maximizar la ventana del navegador
    await page.setViewportSize({ width: 1920, height: 1080 });
    await loginAdmin(page, {
      name: users.superadmin.name,
      pass: users.superadmin.pass,
    });
  });

 test('Filtrar usuarios y verificar resultados', async ({ page }) => {
  // Abrir el menú "Config"
  await page.getByRole('link', { name: /Config/ }).first().click();

  await esperar(page, 1000);

  // Hacer clic en "Usuarios"
  await page.getByText('Usuarios').click();
  await esperar(page, 2000);

  // Verificar que aparece el texto de registros
  await expect(page.getByText('Mostrando registros del 1 al')).toBeVisible();

  // Filtrar por "admin"
  await page.getByRole('searchbox', { name: 'Buscar:' }).fill('admin');

  const tablaUsuarios = page.getByRole('grid');
  await expect(
    tablaUsuarios.getByRole('gridcell', { name: 'admin', exact: true })
  ).toBeVisible();

  // Filtrar por usuario inexistente
  await page.getByRole('searchbox', { name: 'Buscar:' }).fill('usuarioInexistente123');
  await expect(
    page.getByRole('gridcell', { name: 'No se encontraron resultados' })
  ).toBeVisible();
});

test('Crear usuario nuevo y verificar en la grilla', async ({ page }) => {
  // Abrir el menú "Config"
  await page.getByRole('link', { name: /Config/ }).first().click();

  // Ir a "Usuarios"
  await page.getByText('Usuarios').click();

  // Abrir modal "Agregar usuario"
  await page.getByRole('button', { name: 'Agregar usuario' }).click();

  const modal = page.locator('#modalAgregarUsuario');
  const nuevoUser = 'testuser' + Date.now();

  // Completar campos del modal
  await modal.getByPlaceholder('Ingresar nombre').fill('Usuario de prueba');
  await modal.getByPlaceholder('Ingresar usuario').fill(nuevoUser);
  await modal.getByPlaceholder('Ingresar contraseña').fill('123456');
  await modal.getByRole('combobox').selectOption('Administrador');

  // Enviar el formulario: se genera la página con el swal
  await Promise.all([
    page.waitForLoadState('networkidle'),
    modal.getByRole('button', { name: 'Guardar usuario' }).click(),
  ]);

  // 1) Esperar el swal de éxito
  const swalConfirm = page.getByRole('button', { name: 'Cerrar' });
  await expect(swalConfirm).toBeVisible();

  // 2) Cerrar el swal y esperar que haga window.location = "usuarios"
  await Promise.all([
    page.waitForURL(/usuarios/),
    swalConfirm.click(),
  ]);

  // 3) Esperar que la tabla esté lista otra vez
  await expect(
    page.getByText('Mostrando registros del 1 al')
  ).toBeVisible();

  // 4) Filtrar por el usuario recién creado
  await page.getByRole('searchbox', { name: 'Buscar:' }).fill(nuevoUser);

  const tablaUsuarios = page.getByRole('grid');

  await expect(
    tablaUsuarios.getByRole('gridcell', { name: nuevoUser, exact: true })
  ).toBeVisible();
});

test('Crear, activar/desactivar y eliminar usuario en la grilla', async ({ page }) => {

  // Abrir el menú "Config"
  await page.getByRole('link', { name: /Config/ }).first().click();

  // Ir a "Usuarios"
  await page.getByText('Usuarios').click();

  // Abrir modal "Agregar usuario"
  await page.getByRole('button', { name: 'Agregar usuario' }).click();

  const modal = page.locator('#modalAgregarUsuario');
  const nuevoUser = 'testuser' + Date.now();

  // Completar campos
  await modal.getByPlaceholder('Ingresar nombre').fill('Usuario de prueba');
  await modal.getByPlaceholder('Ingresar usuario').fill(nuevoUser);
  await modal.getByPlaceholder('Ingresar contraseña').fill('123456');
  await modal.getByRole('combobox').selectOption('Administrador');

  // Enviar el formulario → muestra swal
  await Promise.all([
    page.waitForLoadState('networkidle'),
    modal.getByRole('button', { name: 'Guardar usuario' }).click(),
  ]);

  // Cerrar swal de éxito
  const swalOk = page.getByRole('button', { name: 'Cerrar' });
  await expect(swalOk).toBeVisible();

  await Promise.all([
    page.waitForURL(/usuarios/),
    swalOk.click(),
  ]);

  // Esperar que la tabla esté lista
  await expect(page.getByText('Mostrando registros del 1 al')).toBeVisible();

  const tablaUsuarios = page.getByRole('grid');

  // Verificar usuario creado
  await page.getByRole('searchbox', { name: 'Buscar:' }).fill(nuevoUser);

  await expect(
    tablaUsuarios.getByRole('gridcell', { name: nuevoUser, exact: true })
  ).toBeVisible();

  // Obtener la fila del usuario
  const filaUsuario = tablaUsuarios.getByRole('row', { name: new RegExp(nuevoUser) });
  await expect(filaUsuario).toBeVisible();


  /* ============================================
        PRUEBA DE ACTIVAR / DESACTIVAR
  ============================================ */

  const btnEstado = filaUsuario.locator('.btnActivar');

  // Validar estado inicial (puede ser Activado o Desactivado según tu config)
  const estadoInicial = (await btnEstado.innerText()).trim();

  // Alternar estado
  await btnEstado.click();
await esperar(page,2000)
  if (estadoInicial.includes('Activado')) {
    await expect(btnEstado).toHaveText('Desactivado');
  } else {
    await expect(btnEstado).toHaveText('Activado');
  }

  // Restaurar estado original
  await btnEstado.click();
  await expect(btnEstado).toHaveText(estadoInicial);


  /* ============================================
        AHORA ELIMINAR EL USUARIO
  ============================================ */

  await filaUsuario.locator('.btnEliminarUsuario').click();

  // Primer swal: confirmación
  const swalConfirmDelete = page.getByRole('button', { name: 'Si, borrar usuario!' });
  await expect(swalConfirmDelete).toBeVisible();

  await Promise.all([
    page.waitForLoadState('networkidle'),
    swalConfirmDelete.click(),
  ]);

  // Segundo swal: éxito
  const swalSuccessDelete = page.getByRole('button', { name: 'Cerrar' });
  await expect(swalSuccessDelete).toBeVisible();

  await Promise.all([
    page.waitForURL(/usuarios/),
    swalSuccessDelete.click(),
  ]);

  // Verificar que ya no existe
  await expect(page.getByText('Mostrando registros del 1 al')).toBeVisible();

  await page.getByRole('searchbox', { name: 'Buscar:' }).fill(nuevoUser);

  await expect(
    page.getByRole('gridcell', { name: 'No se encontraron resultados' })
  ).toBeVisible();

});




});





