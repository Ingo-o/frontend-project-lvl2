import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (pathToFile) => {
  const absolutePath = path.resolve(process.cwd(), pathToFile); // преобразуем путь в абсолютный
  const format = path.extname(absolutePath); // расширение файла
  const data = fs.readFileSync(pathToFile); // читаем файл

  // Выбирается функция-парсер в зависимости от расширения файла
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.safeLoad;
  }

  return parse(data);
};

export default parser;
