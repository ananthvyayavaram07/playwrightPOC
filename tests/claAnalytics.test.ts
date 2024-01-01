import test from "../support/utils/pageObjects";
import ENV from "../support/utils/env";
import common from "../support/utils/common";
import { Page, expect } from "@playwright/test";

let addedAndDeletedByMonthWithoutFilters = {
  measureName: "Added & Deleted by Month",
  index: 5,
  filters: "withOutFilters",
  sheetName: "Added & Deleted by Month",
};

let sourceWithoutFilters = {
  measureName: "Source",
  index: 4,
  filters: "withOutFilters",
  sheetName: "Source",
};

let languageWithoutFilters = {
  measureName: "Language",
  index: 0,
  filters: "withOutFilters",
  sheetName: "cl_language&readability_lang",
};

let readabilityRadingWithoutFilters = {
  measureName: "Readability Ratings",
  index: 1,
  filters: "withOutFilters",
  sheetName: "cl_language&readability_read",
};

let addedAndDeletedByMonthWithFilters = {
  measureName: "Added & Deleted by Month",
  index: 5,
  filters: "withFilters",
  sheetName: "Added & Deleted by Month",
};

let sourceWithFilters = {
  measureName: "Source",
  index: 4,
  filters: "withFilters",
  sheetName: "Source",
};

let languageWithFilters = {
  measureName: "Language",
  index: 0,
  filters: "withFilters",
  sheetName: "cl_language&readability_lang",
};

let readabilityRadingWithFilters = {
  measureName: "Readability Ratings",
  index: 1,
  filters: "withFilters",
  sheetName: "cl_language&readability_read",
};
test.describe("Content library Analytics", async () => {
  // let page: Page;
  // let loginPage: LoginPage;
  // let claPage: CLAPage;
  // test.beforeAll(async ({ browser }) => {
  //   page = await browser.newPage();
  //   loginPage = new LoginPage(page);
  //   claPage = new CLAPage(page);
  // });

  // test.beforeEach(async ()=>{
  //   await loginPage.loginToApplication();
  //   await page.locator(claPage.claPageElements.contentLibrarySide).click();
  // })

  test("Validating the Content library assets count without applying filters", async ({
    page,
    loginPage,
    claPage,
  }) => {
    let libraryCount = null;
    await loginPage.loginToApplication();
    await page.locator(claPage.claPageElements.contentLibrarySide).click();
    libraryCount = await claPage.getContentLibraryCount();
    await page.locator(claPage.claPageElements.libraryInsights).click();

    let attributesLoadingText = await claPage.getFrameLocator(
      claPage.claPageElements.attributesIframe,
      claPage.claPageElements.loadingElement
    );

    await attributesLoadingText.waitFor({ state: "visible" });
    await attributesLoadingText.waitFor({ state: "hidden" });

    let assetsInLibrary = await claPage.getFrameLocator(
      claPage.claPageElements.attributesIframe,
      claPage.claPageElements.assetsInLibraryCardCount
    );

    //Validations in attributes tab
    let count = await assetsInLibrary.textContent();
    expect(count).toEqual(libraryCount);

    await claPage.graphExportedDataValidation(
      claPage.claPageElements.attributesIframe,
      addedAndDeletedByMonthWithoutFilters,
      libraryCount
    );

    await claPage.graphExportedDataValidation(
      claPage.claPageElements.attributesIframe,
      sourceWithoutFilters,
      libraryCount
    );

    //Validations in Languages and readability tab
    await page
      .locator(claPage.claPageElements.languageAndReadabilityTab)
      .click();

    let languageAndReadabilityLoadingText = await claPage.getFrameLocator(
      claPage.claPageElements.languageAndReadabilityIframe,
      claPage.claPageElements.loadingElement
    );

    await languageAndReadabilityLoadingText
      .first()
      .waitFor({ state: "visible" });
    await languageAndReadabilityLoadingText
      .first()
      .waitFor({ state: "hidden" });

    await claPage.graphExportedDataValidation(
      claPage.claPageElements.languageAndReadabilityIframe,
      languageWithoutFilters,
      libraryCount
    );

    await claPage.graphExportedDataValidation(
      claPage.claPageElements.languageAndReadabilityIframe,
      readabilityRadingWithoutFilters,
      libraryCount
    );
  });

  test("Validating the Content library assets count with applying filters", async ({
    page,
    loginPage,
    claPage,
  }) => {
    let libraryCount = null;
    await loginPage.loginToApplication();
    await page.locator(claPage.claPageElements.contentLibrarySide).click();
    await page.locator(claPage.claPageElements.showHideFiltersBtn).click();
    await page.locator(claPage.claPageElements.addFilters).click();
    await page.locator(claPage.claPageElements.mediaTypeFilter).click();
    await page.locator(claPage.claPageElements.videoValue).click();

    await page.waitForTimeout(3000);

    libraryCount = await claPage.getContentLibraryCount();
    await page.locator(claPage.claPageElements.libraryInsights).click();
    let loadingText = await claPage.getFrameLocator(
      claPage.claPageElements.attributesIframe,
      claPage.claPageElements.loadingElement
    );

    await loadingText.waitFor({ state: "visible" });
    await loadingText.waitFor({ state: "hidden" });

    let assetsInLibrary = await claPage.getFrameLocator(
      claPage.claPageElements.attributesIframe,
      claPage.claPageElements.assetsInLibraryCardCount
    );

    //Validations in attributes tab
    let count = await assetsInLibrary.textContent();
    expect(count).toEqual(libraryCount);

    await claPage.graphExportedDataValidation(
      claPage.claPageElements.attributesIframe,
      addedAndDeletedByMonthWithFilters,
      libraryCount
    );

    await claPage.graphExportedDataValidation(
      claPage.claPageElements.attributesIframe,
      sourceWithFilters,
      libraryCount
    );

    //Validations in Languages and readability tab
    await page
      .locator(claPage.claPageElements.languageAndReadabilityTab)
      .click();

    let languageAndReadabilityLoadingText = await claPage.getFrameLocator(
      claPage.claPageElements.languageAndReadabilityIframe,
      claPage.claPageElements.loadingElement
    );

    await languageAndReadabilityLoadingText
      .first()
      .waitFor({ state: "visible" });
    await languageAndReadabilityLoadingText
      .first()
      .waitFor({ state: "hidden" });

    await claPage.graphExportedDataValidation(
      claPage.claPageElements.languageAndReadabilityIframe,
      languageWithFilters,
      libraryCount
    );

    await claPage.graphExportedDataValidation(
      claPage.claPageElements.languageAndReadabilityIframe,
      readabilityRadingWithFilters,
      libraryCount
    );
  });
});
