import {test, expect} from "playwright/test";


import { describe } from "node:test";
import { URLBASE } from '../../context/data/server';
import { esperar, loginAdmin } from "../../context/helper";
import { users } from "../../context/data/users";


describe('Page Inicio',()=>{

    test.beforeEach('Contectarme a la web', async ({ page }) => {
    
        await page.goto(URLBASE)
        // Maximizar la ventana del navegador
        await page.setViewportSize({ width: 1920, height: 1080 });
        await loginAdmin(page,{
            name:users.superadmin.name,
            pass:users.superadmin.pass
        })
    });
    test('Buscar en tabla de productos 1 producto y obtener su precio', async({page}) =>{
        
  
        await page.getByRole('searchbox', { name: 'Buscar:' }).fill('azucar');
        // Verificar que existe al menos un registro con el texto AZUCAR
        await expect(page.getByRole('gridcell', { name: 'AZUCAR', exact: true })).toBeVisible();
        await page.getByRole('gridcell', { name: 'AZUCAR', exact: true }).click();
        await esperar(page,2000);

        // Buscar cualquier elemento que contenga "650" sin esperar visibilidad
        await page.locator(':has-text("650")').first().click();

        // Hacer clic en el botón de impresión específico del primer AZUCAR (item 4)
        const page1Promise = page.waitForEvent('popup');
        await page.locator('button[iditemprint="4"]').click();
        const page1 = await page1Promise;
        // Verificar la URL del popup
        await expect(page1).toHaveURL(/presupuesto_unitario\.php\?item=4/);

        await esperar(page,3000)

    })

    test('Buscar producto inexistente muestra mensaje', async({page}) => {
        await page.getByRole('searchbox', { name: 'Buscar:' }).fill('productoInexistente123');
        // Esperar y verificar que aparece el mensaje de que no hay resultados
        await expect(page.getByRole('gridcell', { name: 'No se encontraron resultados' })).toBeVisible();
    });

    test('Verificar que existen las 10 cajas principales', async ({ page }) => {
  const titulos = [
    'Total de Ventas',
    'Caja (efectivo actual)',
    'Total de Efectivo',
    'Total de Transferencias',
    'Total de Tarjetas',
    'Vales',
    'Cantidad de Ventas',
    'Gastos del día',
    'Stock Valorizado',
    'Ganancia'
  ];

  for (const titulo of titulos) {
    await expect(page.getByText(titulo)).toBeVisible();
  }
});
    
})





