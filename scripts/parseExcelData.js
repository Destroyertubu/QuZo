const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// 读取Excel文件
function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  return workbook;
}

// 解析户籍数据
function parseHouseholdData(filePath) {
  const workbook = readExcel(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  console.log('户籍数据样例:', data.slice(0, 2));
  return data;
}

// 解析地块标记数据
function parseLandPlotData(filePath) {
  const workbook = readExcel(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  console.log('地块数据样例:', data.slice(0, 2));
  return data;
}

// 解析宅基地数据
function parseHomesteadData(filePath) {
  const workbook = readExcel(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  console.log('宅基地数据样例:', data.slice(0, 2));
  return data;
}

// 主函数
function main() {
  const dataDir = path.join(__dirname, '../data');
  const outputDir = path.join(__dirname, '../src/data');

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // 解析户籍数据
    const householdFile = path.join(dataDir, '西河道姓氏户籍(分类别).xlsx');
    const householdData = parseHouseholdData(householdFile);
    fs.writeFileSync(
      path.join(outputDir, 'household.json'),
      JSON.stringify(householdData, null, 2),
      'utf-8'
    );
    console.log('✓ 户籍数据已保存');

    // 解析地块数据
    const landPlotFile = path.join(dataDir, '西河道村大地块标记.xlsx');
    const landPlotData = parseLandPlotData(landPlotFile);
    fs.writeFileSync(
      path.join(outputDir, 'landPlots.json'),
      JSON.stringify(landPlotData, null, 2),
      'utf-8'
    );
    console.log('✓ 地块数据已保存');

    // 解析宅基地数据
    const homesteadFile = path.join(dataDir, 'Copy of 西河道村宅基地地理坐标示意图(1).xlsx');
    const homesteadData = parseHomesteadData(homesteadFile);
    fs.writeFileSync(
      path.join(outputDir, 'homesteads.json'),
      JSON.stringify(homesteadData, null, 2),
      'utf-8'
    );
    console.log('✓ 宅基地数据已保存');

    console.log('\n所有数据解析完成！');
  } catch (error) {
    console.error('解析数据时出错:', error);
  }
}

main();
