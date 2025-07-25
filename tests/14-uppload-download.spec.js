const { test, expect } = require("@playwright/test");
const excelJS = require("exceljs");

async function writeXlsFile(searchTxt, replaceTxt, change, filePathXls) {
  const workbook = new excelJS.Workbook();
  await workbook.xlsx.readFile(filePathXls);
  const worksheet = workbook.getWorksheet("Sheet1");

  const output = await readXlsFile(worksheet, searchTxt);

  const cell = worksheet.getCell(
    output.row,
    output.column + change.columnChange
  );
  cell.value = replaceTxt;
  await workbook.xlsx.writeFile(filePathXls);
}

async function readXlsFile(worksheet, searchTxt) {
  let output = {
    row: -1,
    column: -1,
  };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, columnNumber) => {
      if (cell.value === searchTxt) {
        output.row = rowNumber;
        output.column = columnNumber;
      }
    });
  });

  return output;
}

// ensure change the price of Mango to 450
// writeXlsFile("Mango", 450, { rowChange: 0, columnChange: 2 }, "download.xlsx");

test("Ensure change the price of Mango to 540", async ({ page }) => {
  // locator
  const download_Btn = page.locator("button[id='downloadButton']");
  const chooseFile_Btn = page.locator("input[id='fileinput']");
  const targetPrice = page.locator("#cell-4-undefined");

  // variable
  let itemName = "Mango";
  let updatedPrice = "2000";

  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  // need promise to awai download event
  const downloadPromise = page.waitForEvent("download");
  await download_Btn.click();
  await downloadPromise;
  // update the file
  writeXlsFile(
    itemName,
    updatedPrice,
    { rowChange: 0, columnChange: 2 },
    "/Users/macbookpro/Downloads/download.xlsx"
  );
  await chooseFile_Btn.click();
  await chooseFile_Btn.setInputFiles(
    "/Users/macbookpro/Downloads/download.xlsx"
  );

  // assertions
  const textTarget = page.getByText(itemName); // search by item name
  const targetRow = await page.getByRole("row").filter({ has: textTarget }); // then search row filter by item name
  expect(targetRow.locator(targetPrice)).toContainText(updatedPrice); // from the row, search the spesific locator
});
