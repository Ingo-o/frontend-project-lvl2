import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getDiff = (filepath1, filepath2) => {
  // Преобразуем путь до файла в абсолютный => читаем файл => преобразуем в JS-объект (парсим)
  const file1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1)));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2)));

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  // Объединяем ключи в один массив => удаляем повторяющиеся => сортируем
  const jointKeys = _.sortBy(_.uniq(keys1.concat(keys2)));

  let result = '';

  for (const key of jointKeys) {
    if (keys2.includes(key) && keys1.includes(key)) {
      result += file1[key] === file2[key] ? `    ${key}: ${file1[key]}\n` : `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
    } else if (keys2.includes(key) && !keys1.includes(key)) {
      result += `  + ${key}: ${file2[key]}\n`;
    } else if (keys1.includes(key) && !keys2.includes(key)) {
      result += `  - ${key}: ${file1[key]}\n`;
    }
  }

  return `{\n${result}}`;
};

export default getDiff;
