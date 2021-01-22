import _ from 'lodash';

const depthIndent = (depth) => '    '.repeat(depth);
const plusGap = '  + ';
const minusGap = '  - ';
const neutralGap = '    ';

// Вспомогательная функция для обработки значений
const valueFormatter = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const keys = Object.keys(value);
  const formattedValue = keys.map((key) => `${depthIndent(depth + 2)}${key}: ${valueFormatter(value[key], depth + 1)}`);
  return `{\n${formattedValue.join('\n')}\n${depthIndent(depth + 1)}}`;
};

// Функция формирует stylish-вывод в консоль на основе результата из getDiff
const formatter = (data, depth = 0) => {
  const formattedData = data.map(({
    name, type, value, oldValue, newValue, children,
  }) => {
    if (type === 'ADDED') {
      return `${depthIndent(depth)}${plusGap}${name}: ${valueFormatter(value, depth)}`;
    } if (type === 'REMOVED') {
      return `${depthIndent(depth)}${minusGap}${name}: ${valueFormatter(value, depth)}`;
    } if (type === 'UNCHANGED') {
      return `${depthIndent(depth)}${neutralGap}${name}: ${valueFormatter(value, depth)}`;
    } if (type === 'CHANGED') {
      return `${depthIndent(depth)}${minusGap}${name}: ${valueFormatter(oldValue, depth)}\n${depthIndent(depth)}${plusGap}${name}: ${valueFormatter(newValue, depth)}`;
    }
    // if (type === 'PARENT')
    return `${depthIndent(depth)}${neutralGap}${name}: ${formatter(children, depth + 1)}`;
  });

  return `{\n${formattedData.join('\n')}\n${depthIndent(depth)}}`;
};

export default formatter;
