import {test, expect, Page} from "playwright/test";

export const esperar = async(page:Page,time:number)=>{
    await page.waitForTimeout(time)
}