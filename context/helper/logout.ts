import {test, expect, Page} from "playwright/test";
import { User } from "../data/users";
import { esperar } from "./espera";


export const loginAdmin = async (page:Page,user:User) =>{
    await page.locator('body > div.login-box > div.login-box-body > form > div:nth-child(1) > input').fill(user.name)
    await page.locator('body > div.login-box > div.login-box-body > form > div:nth-child(2) > input').fill(user.pass)
    await esperar(page,3000)
    await page.locator('body > div.login-box > div.login-box-body > form > div.row > div > button').click()

}