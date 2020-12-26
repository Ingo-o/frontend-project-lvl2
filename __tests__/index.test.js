import fs from 'fs';
import getDiff from '../src/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare two flat jsons', () => {
  expect(getDiff('__fixtures__/file1.json', '__fixtures__/file2.json'))
  .toEqual(fs.readFileSync(getFixturePath('expected-file.txt'), 'utf-8'));
});
