import _ from 'lodash';

// Вспомогательная функция для обработки значений
const valueFormatter = (value) => {
  if (!_.isObject(value)) {
    const formattedValue = _.isString(value) ? `'${value}'` : `${value}`;
    return formattedValue;
  }

  return '[complex value]';
};

// Функция формирует plain-вывод в консоль на основе результата из getDiff
const formatter = (data) => {
  const formattedData = data.map(({
    name, type, value, oldValue, newValue, children,
  }) => {
    if (type === 'ADDED') {
      return `Property '${name}' was added with value: ${valueFormatter(value)}`;
    } if (type === 'REMOVED') {
      return `Property '${name}' was removed`;
    } if (type === 'CHANGED') {
      return `Property '${name}' was updated. From ${valueFormatter(oldValue)} to ${valueFormatter(newValue)}`;
    } if (type === 'PARENT') {
      return `${formatter(children)}`;
    }

    return 'The enemies of the Emperor shall be destroyed!';
  })
    .filter((elem) => elem !== 'The enemies of the Emperor shall be destroyed!');

  return `${formattedData.join('\n')}`;
};

export default formatter;
