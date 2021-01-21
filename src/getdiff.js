import _ from 'lodash';

// Функция высчитывает разницу между двумя объектами
const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Объединяем ключи из двух объектов в один массив => удаляем повторяющиеся => сортируем
  const jointKeys = _.sortBy(_.uniq(keys1.concat(keys2)));

  const result = [];

  jointKeys.forEach((key) => {
    if (keys2.includes(key) && !keys1.includes(key)) { // ДОБАВЛЕН
      result.push({
        name: key, type: 'ADDED', value: obj2[key],
      });
    } else if (keys1.includes(key) && !keys2.includes(key)) { // УДАЛЁН
      result.push({
        name: key, type: 'REMOVED', value: obj1[key],
      });
    } else if (keys1.includes(key) && keys2.includes(key)) { // Ключ есть в обоих объектах
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) { // РОДИТЕЛЬ
        result.push({
          name: key, type: 'PARENT', children: getDiff(obj1[key], obj2[key]),
        });
      } else if (obj1[key] === obj2[key]) { // НЕ ИЗМЕНЁН
        result.push({
          name: key, type: 'UNCHANGED', value: obj1[key],
        });
      } else if (obj1[key] !== obj2[key]) { // ИЗМЕНЁН
        result.push({
          name: key, type: 'CHANGED', oldValue: obj1[key], newValue: obj2[key],
        });
      }
    }
  });

  return result;
};

export default getDiff;
