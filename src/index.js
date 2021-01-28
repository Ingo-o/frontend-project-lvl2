import fs from 'fs';
import path from 'path';
import getDiff from './getdiff.js';
import parser from './parser.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  // Преобразование путей до файлов в абсолютные
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  // Получение Расширений файлов
  const extension1 = path.extname(absolutePath1);
  const extension2 = path.extname(absolutePath2);

  // Чтение файлов
  const data1 = fs.readFileSync(absolutePath1);
  const data2 = fs.readFileSync(absolutePath2);

  // Парсинг файлов в JS-объекты
  const obj1 = parser(extension1)(data1);
  const obj2 = parser(extension2)(data2);

  // Выбор форматтера
  const formatter = format(formatName);

  // Формирование diff-файла
  const diff = getDiff(obj1, obj2);

  return formatter(diff);
};
