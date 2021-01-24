import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('Two JSONs and default(stylish)-formatter', () => {
  expect(getDiff('__fixtures__/1.json', '__fixtures__/2.json'))
    .toEqual(fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8'));
});

test('JSON, YML and stylish-formatter', () => {
  expect(getDiff('__fixtures__/1.json', '__fixtures__/2.yml', 'stylish'))
    .toEqual(fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8'));
});

test('Two YAMLs and plain-formatter', () => {
  expect(getDiff('__fixtures__/1.yaml', '__fixtures__/2.yml', 'plain'))
    .toEqual(fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8'));
});

test('YAML, JSON and plain-formatter', () => {
  expect(getDiff('__fixtures__/1.yaml', '__fixtures__/2.json', 'plain'))
    .toEqual(fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8'));
});

test('Two JSONs and json-formatter', () => {
  expect(getDiff('__fixtures__/1.json', '__fixtures__/2.json', 'json'))
    .toEqual(fs.readFileSync(getFixturePath('expected-json.txt'), 'utf-8'));
});

test('Two YAMLs and json-formatter', () => {
  expect(getDiff('__fixtures__/1.yaml', '__fixtures__/2.yml', 'json'))
    .toEqual(fs.readFileSync(getFixturePath('expected-json.txt'), 'utf-8'));
});
