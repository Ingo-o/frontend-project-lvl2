import _ from 'lodash';
import parser from './parser.js';

const getDiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  // Объединяем ключи в один массив => удаляем повторяющиеся => сортируем
  const jointKeys = _.sortBy(_.uniq(keys1.concat(keys2)));

  let result = '';

  jointKeys.forEach((key) => {
    if (keys2.includes(key) && keys1.includes(key)) {
      result += file1[key] === file2[key] ? `    ${key}: ${file1[key]}\n` : `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
    } else if (keys2.includes(key) && !keys1.includes(key)) {
      result += `  + ${key}: ${file2[key]}\n`;
    } else if (keys1.includes(key) && !keys2.includes(key)) {
      result += `  - ${key}: ${file1[key]}\n`;
    }
  });

  return `{\n${result}}`;
};

export default getDiff;
