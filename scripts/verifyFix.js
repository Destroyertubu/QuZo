const fs = require('fs');
const path = require('path');

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/processedHomesteads.json'), 'utf-8')
);

const valid = data.filter(h => h.coordinates.every(c => c.lng !== 0 && c.lat !== 0));

console.log('===== 修复验证 =====');
console.log('Total homesteads:', data.length);
console.log('Valid coordinates:', valid.length);
console.log('Invalid coordinates:', data.length - valid.length);

console.log('\n示例坐标 (DMS格式):');
console.log('  宅基地 1:', JSON.stringify(data[0].coordinates[0]));

console.log('\n示例坐标 (十进制格式):');
const decimal = data.find(h => h.name.includes('139'));
if (decimal) {
  console.log('  宅基地 139:', JSON.stringify(decimal.coordinates[0]));
}

if (valid.length === data.length) {
  console.log('\n✅ 所有 235 个宅基地的坐标都已正确解析！');
} else {
  console.log('\n❌ 仍有', data.length - valid.length, '个宅基地坐标无效');
}
