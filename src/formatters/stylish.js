import _ from 'lodash';

export default (file) => {
  const depthIndent = (depth) => '    '.repeat(depth);
  const plusGap = '  + ';
  const minusGap = '  - ';
  const neutralGap = '    ';

  const formatter = (data, depth) => {
    let result = '';

    const valueFormatter = (value) => {
      if (_.isObject(value)) {
        const formattedValue = Array.isArray(value) ? value : [value];
        return formatter(formattedValue, depth + 1);
      }

      return value;
    };

    const noTypeFormatter = (key, value, semiDepth) => {
      if (_.isObject(value)) {
        const keysAndValues = Object.entries(value);
        for (const [newKey, newValue] of keysAndValues) {
          return `${key}: {\n${depthIndent(semiDepth + 1)}${noTypeFormatter(newKey, newValue, semiDepth + 1)}\n${depthIndent(semiDepth)}}`;
        }
      }

      return `${key}: ${value}`;
    };

    for (const obj of data) {
      if (obj.type === 'ADDED') {
        result += `${depthIndent(depth)}${plusGap}${obj.name}: ${valueFormatter(obj.value)}\n`;
      } if (obj.type === 'REMOVED') {
        result += `${depthIndent(depth)}${minusGap}${obj.name}: ${valueFormatter(obj.value)}\n`;
      } if (obj.type === 'UNCHANGED') {
        result += `${depthIndent(depth)}${neutralGap}${obj.name}: ${valueFormatter(obj.value)}\n`;
      } if (obj.type === 'CHANGED') {
        result += `${depthIndent(depth)}${minusGap}${obj.name}: ${valueFormatter(obj.oldValue)}\n${depthIndent(depth)}${plusGap}${obj.name}: ${valueFormatter(obj.newValue)}\n`;
      } if (obj.type === 'PARENT') {
        result += `${depthIndent(depth)}${neutralGap}${obj.name}: {\n${valueFormatter(obj.value)}${depthIndent(depth + 1)}}\n`;
      } if (obj.hasOwnProperty('type') === false) {
        const keysAndValues = Object.entries(obj);
        let semiResult = '';
        for (const [key, value] of keysAndValues) {
          semiResult += `${depthIndent(depth + 1)}${noTypeFormatter(key, value, depth + 1)}\n`;
        }
        result += `{\n${semiResult}${depthIndent(depth)}}`;
      }
    }

    return result;
  };

  return `{\n${formatter(file, 0)}}`;
};
