import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getDiff = (filepath1, filepath2) => {
  const absolute1 = path.resolve(process.cwd(), filepath1);
  const absolute2 = path.resolve(process.cwd(), filepath2);

  const file1 = JSON.parse(fs.readFileSync(absolute1));
  const file2 = JSON.parse(fs.readFileSync(absolute2));

  let result = '';
  const arr1Keys = _.sortBy(Object.keys(file1));
  const arr2Keys = _.sortBy(Object.keys(file2));

  for (const key of arr1Keys) {
    let substring;
    if (arr2Keys.indexOf(key) >= 0) {
      substring = file1[key] === file2[key] ? `    ${key}: ${file1[key]}\n` : `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
    } else {
      substring = `  - ${key}: ${file1[key]}\n`;
    }
    result += substring;
  }

  for (const key of arr2Keys) {
    let substring = '';
    if (arr1Keys.indexOf(key) === -1) {
      substring = `  + ${key}: ${file2[key]}\n`;
    }
    result += substring;
  }

  return `{\n${result}\n}`;
};

export default getDiff;
