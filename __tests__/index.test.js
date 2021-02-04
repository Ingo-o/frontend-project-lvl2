import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import getDiff from '../src/index.js';

// Получаем URL этого модуля и преобразуем его в путь
const modulePath = fileURLToPath(import.meta.url);

// Получаем путь до дирректории в которой лежит этот модуль
const dirPath = dirname(modulePath);

// Получаем путь до фикстуры
const getFixturePath = (filename) => join(dirPath, '..', '__fixtures__', filename);

// Читаем фикстуры
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['__fixtures__/1.json', '__fixtures__/2.json', 'stylish', readFile('expected-stylish.txt')],
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'plain', readFile('expected-plain.txt')],
  ['__fixtures__/1.json', '__fixtures__/2.yml', 'json', readFile('expected-json.txt')],
])('Difference calculator test', (filepath1, filepath2, formatName, expectedFile) => {
  expect(getDiff(filepath1, filepath2, formatName))
    .toEqual(expectedFile);
});
