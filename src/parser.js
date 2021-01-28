import yaml from 'js-yaml';

// Выбирается парсер в зависимости от расширения
const parser = (extension) => {
  if (extension === '.json') {
    return JSON.parse;
  } if (extension === '.yml' || extension === '.yaml') {
    return yaml.safeLoad;
  }
  throw new Error(`${extension} extension is not supported. Acceptable extensions are json and yaml(yml)`);
};

export default parser;
