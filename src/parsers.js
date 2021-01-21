import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = (pathToFile) => {
  const absolutePath = path.resolve(process.cwd(), pathToFile); // Преобразование пути до файла в абсолютный
  const format = path.extname(absolutePath); // Расширение файла
  const data = fs.readFileSync(pathToFile); // Чтение файла

  // Выбирается функция-парсер в зависимости от расширения файла
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.safeLoad;
  }

  return parse(data);
};

export default parsers;
