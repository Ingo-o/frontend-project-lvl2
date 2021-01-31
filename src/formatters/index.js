import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

// Выбираем и запускаем форматер
const formatters = { stylish, plain, json };

export default (formatName, diff) => formatters[formatName](diff);
