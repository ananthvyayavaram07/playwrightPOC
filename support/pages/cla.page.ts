import { Page, Locator } from "@playwright/test";
import common from "../utils/common";
import { expect } from "@playwright/test";
export default class CLAPage {
  constructor(public page: Page) {}

  public claPageElements = {
    contentLibrarySide: `#content-library`,
    showHideFiltersBtn: `button[data-testid="filter-show-hide-button"]`,
    addFilters: `span:has-text('Add Filter')`,
    mediaTypeFilter: `div[role="dialog"] span:has-text('Media Type')`,
    videoValue: `div[role="dialog"] div[class*='mantine-Checkbox'] label:has-text('video')`,
    libraryAssetCount: `button[id*='tab-assets'] div[class*='Group']:nth-child(2)`,
    libraryInsights: `span:has-text('Library Insights')`,
    attributesIframe: `iframe[title="Attributes"]`,
    assetsInLibraryCardCount: `//div[text()='Assets in Library']/parent::div/div[2]/div`,
    loadingElement: `span:has-text("Loading")`,
    languageAndReadabilityTab: `[id*='tab-language']`,
    attributesTab: `[id*='tab-attributes']`,
    languageSumaryGraph: `[aria-label="Language"]`,
    readabilityRatingGraph: `[aria-label="Readability Ratings"]`,
    languageAndReadabilityIframe: `iframe[title="Language & Readability"]`,
  };

  public async getContentLibraryCount() {
    let libraryAssetCount = await this.page
      .locator(this.claPageElements.libraryAssetCount)
      .textContent();
    libraryAssetCount = libraryAssetCount.split("(")[1].split(")")[0].trim();
    return libraryAssetCount;
  }

  public async getFrameLocator(frameEle, ele) {
    let frameLocator = await this.page.frameLocator(frameEle).locator(ele);
    return frameLocator;
  }

  public async graphExportedDataValidation(
    frame: string,
    config?: any,
    libraryCount?: string
  ) {
    let measureName = config.measureName;
    let sheetName = config.sheetName;
    let index = config.index;
    let filters = config.filters;

    await common.emptyDownloads();

    if (measureName === "Language") {
      await this.page
        .frameLocator(frame)
        .locator(this.claPageElements.languageSumaryGraph)
        .click();
    } else if (measureName === "Readability Ratings") {
      await this.page
        .frameLocator(frame)
        .locator(this.claPageElements.readabilityRatingGraph)
        .click();
    } else {
      await this.page
        .frameLocator(frame)
        .locator(
          `//div[contains(@id,'layout-bod')]//div[text()='${measureName}']`
        )
        .click({ force: true });
    }
    await this.page.waitForTimeout(1000);
    await this.page
      .frameLocator(frame)
      .locator(`[data-testid="crumb-settings"] svg`)
      .nth(index)
      .click({ force: true });

    await this.page.waitForTimeout(1000);
    await this.page
      .frameLocator(frame)
      .locator(`[data-testid="menuitem-export"]`)
      .hover({ force: true });

    const download = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.frameLocator(frame).locator(`[data-testid="Excel"]`).click(),
    ]);

    const fileName = download[0].suggestedFilename();
    await download[0].saveAs("downloads/" + fileName);

    await common.renameFile(
      `downloads/${measureName}.xlsx`,
      `downloads/${measureName}${filters}.xlsx`
    );

    const rows = await common.readExcel({
      file: `downloads/${measureName}${filters}.xlsx`,
      sheet: `${sheetName}`,
    });
    common.writeToJson(rows, `downloads/${measureName}${filters}.json`);

    let data = await common.readJson(`${measureName}${filters}.json`);
    if (measureName.includes("Added & Deleted by Month")) {
      expect(data[11]["Library size"].toString()).toEqual(libraryCount);
    } else if (
      measureName.includes("Source") ||
      measureName.includes("Language")
    ) {
      let sum = 0;
      for (let key in data) {
        sum = sum + data[key]["No of Contents"];
      }
      expect(sum.toString()).toEqual(libraryCount);
    }
  }
}
