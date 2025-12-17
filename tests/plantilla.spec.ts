import {test, expect} from "playwright/test";
import { describe } from "node:test";
import { URLBASE } from "../context/data/server";
import { esperar, loginAdmin } from "../context/helper";
import { users } from "../context/data/users";



describe('LOGIN',()=>{

    test.beforeEach('Contectarme a la web', async ({ page }) => {
    
        await page.goto(URLBASE)

    });
    test('Logout', async({page}) =>{

        await loginAdmin(page,{name:users.superadmin.name,pass:users.superadmin.pass})
        
        
        await esperar(page,1000)
        
        await page.getByRole('link', { name: 'Ariel Bernardo', exact: true }).click();
        await page.getByRole('link', { name: 'Salir' }).click();
        await esperar(page,1000)
        await expect(page).toHaveURL(`${URLBASE}/ingreso`)
    })
    test('editar perfil', async({page}) =>{

        await loginAdmin(page,{name:users.superadmin.name,pass:users.superadmin.pass})
        
        
        await esperar(page,1000)
        
        await page.getByRole('link', { name: 'Ariel Bernardo', exact: true }).click();
        await page.getByRole('link', { name: 'Editar Perfil' }).click();
        await esperar(page,1000)
        await expect(page).toHaveURL(`${URLBASE}/editar-perfil`)
    })
    test('cambiar la foto', async({page}) =>{

        await loginAdmin(page,{name:users.superadmin.name,pass:users.superadmin.pass})
        
        
        await esperar(page,1000)
        
        await page.getByRole('button', { name: 'Choose File' }).click();
        //fataria seleccionar una foto

        await esperar(page,1000)

        //guardar la foto
          await page.getByRole('button', { name: 'Guardar Mi Foto' }).click();
        //hacer logout y luego volver a iniciar y ver la nueva ffoto, ver como se guarda

        // await expect(page).toHaveURL(`${URLBASE}/editar-perfil`)
    })
    test('cambiar la contraseña', async({page}) =>{

        await loginAdmin(page,{name:users.superadmin.name,pass:users.superadmin.pass})
        
        
        await esperar(page,1000)
        
          await page.getByRole('textbox', { name: 'Ingresar contraseña' }).click();

        //fataria seleccionar una foto

        await esperar(page,1000)
  await page.getByRole('button', { name: 'Guardar mi Contraseña' }).click();

        
        //hacer logout y luego volver a iniciar y volver a loguearme

        // await expect(page).toHaveURL(`${URLBASE}/editar-perfil`)
    })
  test('abrir sidebar', async({page}) =>{

        await loginAdmin(page,{name:users.superadmin.name,pass:users.superadmin.pass})
        
        
        await esperar(page,1000)
        
           await page.getByRole('button', { name: ' Toggle navigation' }).click();

    })

})





