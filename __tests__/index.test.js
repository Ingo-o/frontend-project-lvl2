import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('comparing two json-files', () => {
  expect(getDiff('__fixtures__/1.json', '__fixtures__/2.json'))
    .toEqual(fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8'));
});

test('comparing two yaml-files', () => {
  expect(getDiff('__fixtures__/1.yaml', '__fixtures__/2.yml'))
    .toEqual(fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8'));
});

test('comparing json and yaml files', () => {
  expect(getDiff('__fixtures__/1.json', '__fixtures__/2.yml'))
    .toEqual(fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8'));
});
