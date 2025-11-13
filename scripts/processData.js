const fs = require('fs');
const path = require('path');

// 读取原始JSON数据
const householdRaw = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/household.json'), 'utf-8')
);
const landPlotsRaw = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/landPlots.json'), 'utf-8')
);
const homesteadsRaw = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/homesteads.json'), 'utf-8')
);

// 处理户籍数据 - 移除敏感信息
function processHouseholdData(data) {
  const households = [];
  let currentHousehold = null;
  let householdId = 0;

  data.forEach((row, index) => {
    // 跳过表头
    if (index === 0 || row.__EMPTY === '序号') return;

    // 如果有序号，说明是新的一户
    if (row.__EMPTY && typeof row.__EMPTY === 'number') {
      if (currentHousehold) {
        households.push(currentHousehold);
      }
      householdId++;
      currentHousehold = {
        id: `H${String(householdId).padStart(3, '0')}`,
        householder: row.__EMPTY_1?.trim() || '',
        members: [],
        totalMembers: 0,
        partyMembers: 0,
        surname: ''
      };
    }

    if (currentHousehold && row.__EMPTY_1) {
      const member = {
        name: row.__EMPTY_1.trim(),
        relationship: row.__EMPTY_2 || '',
        // 移除敏感信息：身份证号和手机号
        // idCard: row.__EMPTY_3,
        // phone: row.__EMPTY_4,
        note: row.__EMPTY_5 || ''
      };

      currentHousehold.members.push(member);
      currentHousehold.totalMembers++;

      if (member.note && member.note.includes('党员')) {
        currentHousehold.partyMembers++;
      }

      // 提取姓氏
      if (member.relationship === '户主' && member.name) {
        currentHousehold.surname = member.name.charAt(0);
        currentHousehold.householder = member.name;
      }
    }
  });

  // 添加最后一户
  if (currentHousehold) {
    households.push(currentHousehold);
  }

  return households;
}

// 处理大地块数据
function processLandPlotData(data) {
  return data.map((plot, index) => {
    // 解析经纬度字符串
    const coordsStr = plot['经纬度[经度 + 纬度]'];
    const coordPairs = coordsStr.split(';');
    const coordinates = coordPairs.map(pair => {
      const [lng, lat] = pair.split(',').map(Number);
      return { lng, lat };
    });

    return {
      id: `LP${String(plot.名称 || index + 1).padStart(3, '0')}`,
      name: `地块 ${plot.名称 || index + 1}`,
      type: 'farmland',
      coordinates: coordinates,
      color: plot.线条颜色 || '0X00FF0000',
      area: 0 // 需要计算
    };
  });
}

// 处理宅基地数据
function processHomesteadData(data) {
  return data.map((homestead, index) => {
    // 解析度分秒格式的坐标
    const coordsStr = homestead['经纬度[经度 + 纬度]'];
    const coordPairs = coordsStr.split(';');

    const coordinates = coordPairs.map(pair => {
      // 解析度分秒格式：114°54'54.0541",36°40'49.6472"
      const [lngStr, latStr] = pair.split(',');

      const lng = parseDMS(lngStr);
      const lat = parseDMS(latStr);

      return { lng, lat };
    });

    // 解析Comment字段获取户主和面积
    const comment = homestead.Comment || '';
    const householderMatch = comment.match(/户主[：:]\s*([^\n]+)/);
    const areaMatch = comment.match(/面积[：:]\s*([\d.]+)/);

    return {
      id: `HS${String(homestead.名称 || index + 1).padStart(3, '0')}`,
      name: `宅基地 ${homestead.名称 || index + 1}`,
      type: 'homestead',
      coordinates: coordinates,
      householder: householderMatch ? householderMatch[1].trim() : '',
      area: areaMatch ? parseFloat(areaMatch[1]) : 0,
      color: homestead.线条颜色 || '0XFAFF0000'
    };
  });
}

// 将度分秒转换为十进制度（同时支持已经是十进制的坐标）
function parseDMS(dmsStr) {
  // 移除引号和空格
  dmsStr = dmsStr.replace(/"/g, '').trim();

  // 检查是否包含度符号，如果不包含，说明已经是十进制格式
  if (!dmsStr.includes('°')) {
    const decimal = parseFloat(dmsStr);
    return isNaN(decimal) ? 0 : decimal;
  }

  // 匹配度分秒格式
  const match = dmsStr.match(/(\d+)°(\d+)'([\d.]+)/);
  if (!match) return 0;

  const degrees = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);

  return degrees + minutes / 60 + seconds / 3600;
}

// 生成统计数据
function generateStatistics(households, landPlots, homesteads) {
  // 统计姓氏分布
  const surnameCount = {};
  households.forEach(h => {
    if (h.surname) {
      surnameCount[h.surname] = (surnameCount[h.surname] || 0) + 1;
    }
  });

  // 总人口数
  const totalPopulation = households.reduce((sum, h) => sum + h.totalMembers, 0);
  const totalPartyMembers = households.reduce((sum, h) => sum + h.partyMembers, 0);

  // 土地面积统计
  const totalLandArea = landPlots.length;
  const totalHomesteadArea = homesteads.reduce((sum, h) => sum + h.area, 0);

  return {
    totalHouseholds: households.length,
    totalPopulation: totalPopulation,
    totalPartyMembers: totalPartyMembers,
    totalLandPlots: landPlots.length,
    totalHomesteads: homesteads.length,
    totalHomesteadArea: totalHomesteadArea.toFixed(2),
    surnameDistribution: Object.entries(surnameCount)
      .map(([surname, count]) => ({ surname, count }))
      .sort((a, b) => b.count - a.count)
  };
}

// 主处理函数
function main() {
  console.log('开始处理数据...\n');

  // 处理数据
  const households = processHouseholdData(householdRaw);
  const landPlots = processLandPlotData(landPlotsRaw);
  const homesteads = processHomesteadData(homesteadsRaw);
  const statistics = generateStatistics(households, landPlots, homesteads);

  // 保存处理后的数据
  const outputDir = path.join(__dirname, '../src/data');

  fs.writeFileSync(
    path.join(outputDir, 'processedHouseholds.json'),
    JSON.stringify(households, null, 2),
    'utf-8'
  );
  console.log(`✓ 已处理 ${households.length} 户家庭数据`);

  fs.writeFileSync(
    path.join(outputDir, 'processedLandPlots.json'),
    JSON.stringify(landPlots, null, 2),
    'utf-8'
  );
  console.log(`✓ 已处理 ${landPlots.length} 个大地块数据`);

  fs.writeFileSync(
    path.join(outputDir, 'processedHomesteads.json'),
    JSON.stringify(homesteads, null, 2),
    'utf-8'
  );
  console.log(`✓ 已处理 ${homesteads.length} 个宅基地数据`);

  fs.writeFileSync(
    path.join(outputDir, 'statistics.json'),
    JSON.stringify(statistics, null, 2),
    'utf-8'
  );
  console.log('✓ 已生成统计数据\n');

  // 显示统计摘要
  console.log('=== 数据统计摘要 ===');
  console.log(`总户数: ${statistics.totalHouseholds}`);
  console.log(`总人口: ${statistics.totalPopulation}`);
  console.log(`党员数: ${statistics.totalPartyMembers}`);
  console.log(`大地块数: ${statistics.totalLandPlots}`);
  console.log(`宅基地数: ${statistics.totalHomesteads}`);
  console.log(`宅基地总面积: ${statistics.totalHomesteadArea} 平方米`);
  console.log('\n前5大姓氏:');
  statistics.surnameDistribution.slice(0, 5).forEach(s => {
    console.log(`  ${s.surname}姓: ${s.count}户`);
  });

  console.log('\n数据处理完成！');
}

main();
