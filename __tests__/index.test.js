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
  ['__fixtures__/1.json', '__fixtures__/2.json'],
  ['__fixtures__/1.yaml', '__fixtures__/2.yml'],
  ['__fixtures__/1.json', '__fixtures__/2.yml'],
  ['__fixtures__/1.yaml', '__fixtures__/2.json'],
])('Default(stylish)-formatter test', (filepath1, filepath2) => {
  expect(getDiff(filepath1, filepath2))
    .toEqual(expectedStylish);
});

test.each([
  ['__fixtures__/1.json', '__fixtures__/2.json', 'stylish'],
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'stylish'],
  ['__fixtures__/1.json', '__fixtures__/2.yml', 'stylish'],
  ['__fixtures__/1.yaml', '__fixtures__/2.json', 'stylish'],
])('Stylish-formatter test', (filepath1, filepath2, formatName) => {
  expect(getDiff(filepath1, filepath2, formatName))
    .toEqual(expectedStylish);
});

test.each([
  ['__fixtures__/1.json', '__fixtures__/2.json', 'plain'],
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'plain'],
  ['__fixtures__/1.json', '__fixtures__/2.yml', 'plain'],
  ['__fixtures__/1.yaml', '__fixtures__/2.json', 'plain'],
])('Plain-formatter test', (filepath1, filepath2, formatName) => {
  expect(getDiff(filepath1, filepath2, formatName))
    .toEqual(expectedPlain);
});

test.each([
  ['__fixtures__/1.json', '__fixtures__/2.json', 'json'],
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'json'],
  ['__fixtures__/1.json', '__fixtures__/2.yml', 'json'],
  ['__fixtures__/1.yaml', '__fixtures__/2.json', 'json'],
])('Json-formatter test', (filepath1, filepath2, formatName) => {
  expect(getDiff(filepath1, filepath2, formatName))
    .toEqual(expectedJson);
});
