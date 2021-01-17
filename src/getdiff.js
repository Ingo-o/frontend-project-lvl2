import _ from 'lodash';

const getDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  // Объединяем ключи в один массив => удаляем повторяющиеся => сортируем
  const jointKeys = _.sortBy(_.uniq(keys1.concat(keys2)));

  const result = [];

  jointKeys.forEach((key) => {
    // Ключ есть во втором, а в первом нет (ADDED)
    if (keys2.includes(key) && !keys1.includes(key)) {
      result.push({ name: key, type: 'ADDED', value: file2[key] });
      // Ключ есть в первом, а во втором нет (REMOVED)
    } else if (keys1.includes(key) && !keys2.includes(key)) {
      result.push({ name: key, type: 'REMOVED', value: file1[key] });
      // Ключ есть в обоих
    } else if (keys1.includes(key) && keys2.includes(key)) {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        result.push({ name: key, type: 'PARENT', value: getDiff(file1[key], file2[key]) });
      } else if (file1[key] === file2[key]) {
        result.push({ name: key, type: 'UNCHANGED', value: file1[key] });
      } else if (file1[key] !== file2[key]) {
        result.push({ name: key, type: 'CHANGED', oldValue: file1[key], newValue: file2[key] });
      }
    }
  });

  return result;
};

export default getDiff;
