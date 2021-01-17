import getDiff from './getdiff.js';
import parsers from './parsers.js';
import format from './formatters/stylish.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parsers(filepath1);
  const file2 = parsers(filepath2);
  return format(getDiff(file1, file2));
};
