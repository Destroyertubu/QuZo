const fs = require('fs');
const path = require('path');

// 读取原始数据
const homesteadsRaw = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/homesteads.json'), 'utf-8')
);

// 读取已处理数据
const processedHomesteads = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/processedHomesteads.json'), 'utf-8')
);

// 将度分秒转换为十进制度 (复制当前实现)
function parseDMS(dmsStr) {
  // 移除引号
  dmsStr = dmsStr.replace(/"/g, '');

  // 匹配度分秒格式
  const match = dmsStr.match(/(\d+)°(\d+)'([\d.]+)/);
  if (!match) return 0;

  const degrees = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);

  return degrees + minutes / 60 + seconds / 3600;
}

console.log('===== 诊断坐标解析问题 =====\n');

// 找出无效坐标的地块
const invalidHomesteads = processedHomesteads.filter(h =>
  h.coordinates.some(coord => coord.lng === 0 || coord.lat === 0)
);

console.log(`无效坐标的宅基地数量: ${invalidHomesteads.length}\n`);

// 显示前10个无效地块的详细信息
console.log('前10个无效地块的坐标字符串:\n');
invalidHomesteads.slice(0, 10).forEach((h, i) => {
  // 找到对应的原始数据
  const raw = homesteadsRaw.find(r => r.名称 === parseInt(h.name.replace('宅基地 ', '')));

  if (raw) {
    console.log(`${i + 1}. 宅基地 ${h.name}`);
    console.log(`   原始坐标字符串: ${raw['经纬度[经度 + 纬度]']}`);

    // 测试解析第一个坐标点
    const coordsStr = raw['经纬度[经度 + 纬度]'];
    const coordPairs = coordsStr.split(';');
    if (coordPairs.length > 0) {
      const firstPair = coordPairs[0];
      const [lngStr, latStr] = firstPair.split(',');

      console.log(`   分割后 lngStr: "${lngStr}"`);
      console.log(`   分割后 latStr: "${latStr}"`);

      const lng = parseDMS(lngStr);
      const lat = parseDMS(latStr);

      console.log(`   解析结果: lng=${lng}, lat=${lat}`);

      // 测试正则匹配
      const lngClean = lngStr.replace(/"/g, '');
      const latClean = latStr.replace(/"/g, '');
      const lngMatch = lngClean.match(/(\d+)°(\d+)'([\d.]+)/);
      const latMatch = latClean.match(/(\d+)°(\d+)'([\d.]+)/);

      console.log(`   正则匹配 lng: ${lngMatch ? 'SUCCESS' : 'FAILED'}`);
      console.log(`   正则匹配 lat: ${latMatch ? 'SUCCESS' : 'FAILED'}`);
      if (!lngMatch) console.log(`   lng字符 (去引号): "${lngClean}"`);
      if (!latMatch) console.log(`   lat字符 (去引号): "${latClean}"`);
    }
    console.log('');
  }
});

// 统计不同的失败原因
console.log('\n===== 分析失败原因 =====');
console.log('检查所有无效坐标的第一个点...\n');

const failures = {
  lngFailed: 0,
  latFailed: 0,
  both: 0
};

invalidHomesteads.forEach(h => {
  const raw = homesteadsRaw.find(r => r.名称 === parseInt(h.name.replace('宅基地 ', '')));
  if (raw) {
    const coordsStr = raw['经纬度[经度 + 纬度]'];
    const coordPairs = coordsStr.split(';');
    if (coordPairs.length > 0) {
      const firstPair = coordPairs[0];
      const [lngStr, latStr] = firstPair.split(',');

      const lngClean = lngStr.replace(/"/g, '');
      const latClean = latStr ? latStr.replace(/"/g, '') : '';

      const lngMatch = lngClean.match(/(\d+)°(\d+)'([\d.]+)/);
      const latMatch = latClean.match(/(\d+)°(\d+)'([\d.]+)/);

      if (!lngMatch && !latMatch) {
        failures.both++;
      } else if (!lngMatch) {
        failures.lngFailed++;
      } else if (!latMatch) {
        failures.latFailed++;
      }
    }
  }
});

console.log(`经度解析失败: ${failures.lngFailed}`);
console.log(`纬度解析失败: ${failures.latFailed}`);
console.log(`两者都失败: ${failures.both}`);
