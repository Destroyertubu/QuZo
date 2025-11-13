const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('/Users/lostmagician/Desktop/code/quzo-village-management/data/Copy of 西河道村宅基地地理坐标示意图(1).xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// 转换为JSON
const data = XLSX.utils.sheet_to_json(sheet);

console.log('Excel文件sheet名称:', sheetName);
console.log('Excel总行数（有数据的行）:', data.length);
console.log('\nExcel列名:', Object.keys(data[0] || {}));

// 统计有效行（有坐标的）
const coordKey = '经纬度[经度 + 纬度]';
const validRows = data.filter(row => row[coordKey]);
console.log('有坐标的有效行数:', validRows.length);

// 检查是否有些行没有坐标
const noCoords = data.filter(row => !row[coordKey]);
console.log('没有坐标的行数:', noCoords.length);

if (noCoords.length > 0) {
  console.log('\n前10个没有坐标的行:');
  noCoords.slice(0, 10).forEach((row, i) => {
    console.log(`  ${i+1}. 名称: ${row['名称']}, Comment: ${row['Comment'] || '无'}`);
  });
}

// 显示名称的范围
const names = data.map(row => row['名称']).filter(n => n && typeof n === 'number');
console.log('\n名称最小值:', Math.min(...names));
console.log('名称最大值:', Math.max(...names));
console.log('有名称的行数:', names.length);

// 检查已处理的数据
const processed = JSON.parse(fs.readFileSync('/Users/lostmagician/Desktop/code/quzo-village-management/src/data/processedHomesteads.json', 'utf8'));
console.log('\n已处理并导入系统的宅基地数量:', processed.length);

if (validRows.length !== processed.length) {
  console.log('\n⚠️  Excel有效数据 vs 系统数据不一致！');
  console.log('   Excel有效行:', validRows.length);
  console.log('   系统已导入:', processed.length);
  console.log('   差异:', validRows.length - processed.length);
} else {
  console.log('\n✅ 所有有效数据已导入系统');
}
