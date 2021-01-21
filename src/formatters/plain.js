import _ from 'lodash';

// Вспомогательная функция для обработки значений
const valueFormatter = (value) => {
  if (!_.isObject(value)) {
    return value;
  }

  return `[complex value]`;
};

// Функция формирует plain-вывод в консоль на основе результата из getDiff
const formatter = (data) => {
  console.log(`${JSON.stringify(data, null, 2)}\n--------------------------------------------------------------------`)
  const formattedData = data.map(({
    name, type, value, oldValue, newValue, children,
  }) => {
    if (type === 'ADDED') {
      return `Property 'TEST' was added with value: ${valueFormatter(value)}`;
    } if (type === 'REMOVED') {
      return `Property 'TEST' was removed`;
    } if (type === 'CHANGED') {
      return `Property 'TEST was updated. From ${valueFormatter(oldValue)} to ${valueFormatter(newValue)}`;
    }
    // if (type === 'PARENT') - дефолтное условие что бы линтер не ругался :-\
    return `${formatter(children)}`;
  });  

  return `${formattedData.join('\n')}`;
};

export default formatter;
