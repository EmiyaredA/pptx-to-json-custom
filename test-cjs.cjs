const fs = require('fs').promises;
const path = require('path');

// 使用动态导入
async function runTest() {
  try {
    // 动态导入模块
    const { parse } = await import('./dist/index.js');
    
    // 读取一个PPTX文件
    console.log('正在读取PPTX文件...');
    const fileBuffer = await fs.readFile('./data/Ramadan Google Slides.pptx');
    
    // 解析PPTX文件
    console.log('正在解析PPTX文件...');
    const result = await parse(fileBuffer);
    
    // 输出结果
    console.log('解析结果:');
    console.log(JSON.stringify(result, null, 2));
    
    // 可选：将结果保存到文件
    await fs.writeFile('./output.json', JSON.stringify(result, null, 2));
    console.log('结果已保存到 output.json');
  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
}

runTest();