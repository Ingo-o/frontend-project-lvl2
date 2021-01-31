import _ from 'lodash';

// Функция высчитывает разницу между двумя объектами
const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Создаем массив уникальных значений => сортируем
  const allKeys = _.sortBy(_.union(keys1, keys2));

  const result = allKeys.map((key) => {
    if (!_.has(obj1, key)) { // ДОБАВЛЕН
      return {
        name: key, type: 'ADDED', value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) { // УДАЛЁН
      return {
        name: key, type: 'REMOVED', value: obj1[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) { // РОДИТЕЛЬ
      return {
        name: key, type: 'PARENT', children: getDiff(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] !== obj2[key]) { // ИЗМЕНЁН
      return {
        name: key, type: 'CHANGED', oldValue: obj1[key], newValue: obj2[key],
      };
    }

    return { // НЕ ИЗМЕНЁН
      name: key, type: 'UNCHANGED', value: obj1[key],
    };
  });

  return result;
};

export default getDiff;
