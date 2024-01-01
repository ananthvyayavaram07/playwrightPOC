import fsextra from "fs-extra";
import * as fs from "fs";
import { Page, Locator } from "@playwright/test";

const XLSX = require("xlsx");
export default class common {
  constructor(public page: Page) {}

  public static emptyDownloads() {
    fsextra.emptyDirSync("downloads");
  }

  public static renameFile(oldName, newName) {
    fs.renameSync(oldName, newName);
  }

  public static readExcel({ file, sheet }) {
    const buf = fs.readFileSync(file);
    const workbook = XLSX.read(buf, { type: "buffer" });
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    return rows;
  }

  public static writeToJson(data, file) {
    fs.writeFileSync(file, JSON.stringify(data));
  }

  public static readJson(file) {
    const testdata = require(`../../downloads/${file}`);
    let data = JSON.parse(JSON.stringify(testdata));
    return data;
  }

  //When selceted file chooser is a input tag
  public async ulpoadFileWithInputTag(selector, file) {    
    await this.page.setInputFiles(selector, file);
  }

  //When selceted file chooser is not a input tag
  public async ulpoadFileWithOutTag(selector, file) {
    const filePath = require(`../../downloads/${file}`);
    this.page.on("filechooser", async (fileChooser) => {
      await fileChooser.setFiles(file)      
    });
    await this.page.click(selector);
  }

  public async acceptAlert(selector) {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept("Test text") 
    });
    await this.page.click(selector);
  }

  public async dismissAlert(selector) {
    this.page.on("dialog", async (dialog) => {
      await dialog.dismiss() 
    });
    await this.page.click(selector);
  }

  public async readMessage(selector) {
    this.page.on("dialog", async (dialog) => {
      console.log(dialog.type() );  // returns type of allert that is simple or promt like that
      let message= await dialog.message() // returns the message on alert 
      console.log(message);
      await dialog.dismiss()  // dismiss the alert
    });
    await this.page.click(selector,{force:true});
  }
}
