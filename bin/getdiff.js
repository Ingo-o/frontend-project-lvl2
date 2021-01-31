#!/usr/bin/env node

// commander.js - библиотека для создания утилит командной строки
import program from 'commander';
import getDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(getDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
