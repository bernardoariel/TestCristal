import {test, expect} from "playwright/test";

import { users } from "../../context/data/users";
import { esperar, loginAdmin } from "../../context/helper";


import { describe } from "node:test";
import { URLBASE } from '../../context/data/server';


describe('LOGIN',()=>{

    test.beforeEach('Contectarme a la web', async ({ page }) => {
    
        await page.goto(URLBASE)

    });
    test('Login correcto', async({page}) =>{

        await loginAdmin(page,{name:users.superadmin.name,pass:users.superadmin.pass})
        
        await expect(page).toHaveURL(`${URLBASE}/inicio`)
        
        await esperar(page,1000)
        
    })

    test('Login con contraseña incorrecta', async({page}) =>{
        //aca hay un error en el desarrollo del login del programa 
        await loginAdmin(page,{
            name:users.superadmin.name,
            pass:'123456'
        })

        // Verificar que aparece el mensaje de error
        const errorAlert = page.locator('body > div.login-box > div.login-box-body > form > div.alert.alert-danger');
        await expect(errorAlert).toBeVisible();

        // Verificar que permanece en la página de login
        await expect(page).toHaveURL(URLBASE)
        await esperar(page,2000)
    
    })

    test('Login con usuario y contraseña incorrectos', async({page}) =>{

       await loginAdmin(page,{
            name:'aaa',
            pass:'123456'
        })

        // Verificar que aparece el mensaje de error
        const errorAlert = page.locator('body > div.login-box > div.login-box-body > form > div.alert.alert-danger');
        await expect(errorAlert).toBeVisible();

        // Verificar que permanece en la página de login
        await expect(page).toHaveURL(URLBASE)
        await esperar(page,2000)
        
    })
})





