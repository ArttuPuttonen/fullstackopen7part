import { test, describe, expect } from "@playwright/test";

describe("Blog app", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByText("Blogs");
  });

  test("login form can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("button", { name: "log in" }).click();
    await page.getByRole("textbox").first().fill("testauskäyttäjä");
    await page.getByRole("textbox").last().fill("salasana");
    await page.getByRole("button", { name: "login" }).click();
  });

  test("a new blog can be created", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("button", { name: "log in" }).click();
    await page.getByRole("textbox").first().fill("testauskäyttäjä");
    await page.getByRole("textbox").last().fill("salasana");
    await page.getByRole("button", { name: "login" }).click();

    await page.getByRole("button", { name: "create new blog" }).click();
    await page.getByRole("textbox").first().fill("testausta");
    await page.getByRole("textbox").nth(1).fill("testausta");
    await page.getByRole("textbox").last().fill("testausta");
    await page.getByRole("button", { name: "create" }).click();
  });

  test("a blog can be liked", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("button", { name: "log in" }).click();
    await page.getByRole("textbox").first().fill("testauskäyttäjä");
    await page.getByRole("textbox").last().fill("salasana");
    await page.getByRole("button", { name: "login" }).click();

    await page.getByRole("button", { name: "view" }).first().click();
    await page.getByRole("button", { name: "like" }).first().click();
  });

  test("a blog can be deleted", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("button", { name: "log in" }).click();
    await page.getByRole("textbox").first().fill("testauskäyttäjä");
    await page.getByRole("textbox").last().fill("salasana");
    await page.getByRole("button", { name: "login" }).click();

    await page.getByRole("button", { name: "view" }).first().click();
    await page.getByRole("button", { name: "remove" }).click();
  });

  test("remove button is only visible for the user who created the blog", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("button", { name: "log in" }).click();
    await page.getByRole("textbox").first().fill("testauskäyttäjä");
    await page.getByRole("textbox").last().fill("salasana");
    await page.getByRole("button", { name: "login" }).click();

    await page.getByRole("button", { name: "view" }).first().click();
    await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

    await page.getByRole("button", { name: "log out" }).click();
    await page.getByRole("button", { name: "log in" }).click();
    await page.getByRole("textbox").first().fill("testauskäyttäjä2");
    await page.getByRole("textbox").last().fill("salasana2");
    await page.getByRole("button", { name: "login" }).click();

    await page.getByRole("button", { name: "view" }).first().click();
    await expect(
      page.getByRole("button", { name: "remove" }),
    ).not.toBeVisible();
  });
});
