import yaml from 'js-yaml';

// Выбираем и запускаем парсер
const parser = (dataFormat, data) => {
  if (dataFormat === 'json') {
    return JSON.parse(data);
  }
  if (dataFormat === 'yml' || dataFormat === 'yaml') {
    return yaml.safeLoad(data);
  }
  throw new Error(`"${dataFormat}" format is not supported. Acceptable formats are "json", "yaml" or "yml")`);
};

export default parser;
