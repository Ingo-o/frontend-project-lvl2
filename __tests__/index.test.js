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
const expectedStylish = readFile('expected-stylish.txt');
const expectedPlain = readFile('expected-plain.txt');
const expectedJson = readFile('expected-json.txt');

test.each([
  // JSON
  ['__fixtures__/1.json', '__fixtures__/2.json', 'stylish', expectedStylish],
  ['__fixtures__/1.json', '__fixtures__/2.json', 'plain', expectedPlain],
  ['__fixtures__/1.json', '__fixtures__/2.json', 'json', expectedJson],

  // YAML and YML
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'stylish', expectedStylish],
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'plain', expectedPlain],
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'json', expectedJson],

  // CROSSED
  ['__fixtures__/1.json', '__fixtures__/2.yml', 'stylish', expectedStylish],
  ['__fixtures__/1.yaml', '__fixtures__/2.json', 'plain', expectedPlain],

])('Difference calculator test', (filepath1, filepath2, formatName, expectedFile) => {
  expect(getDiff(filepath1, filepath2, formatName))
    .toEqual(expectedFile);
});
