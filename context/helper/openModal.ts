import { expect, Page } from '@playwright/test';

export async function openModalByTarget(
  page: Page,
  target: string,
  options?: { timeout?: number }
) {
  const timeout = options?.timeout ?? 10000;

  // 1) Click al disparador del modal
  await page.locator(
    `a[data-target="${target}"], 
     a[data-bs-target="${target}"],
     button[data-target="${target}"], 
     button[data-bs-target="${target}"]`
  ).first().click();

  // 2) Resolver modal
  const modal = page.locator(target);

  // 3) Esperar a que esté visible (Bootstrap 3 usa "in", 4/5 usa "show")
  await expect(modal).toBeVisible({ timeout });

  // Esperar a que tenga clase de modal abierto
  await expect(modal).toHaveClass(/(in|show)/, { timeout });

  return modal;
}
