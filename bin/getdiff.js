#!/usr/bin/env node

import program from 'commander';
import getDiff from '../src/index.js';
import parsers from '../src/parsers.js';
import formatter from '../src/formatters/formatter.js'

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(formatter(getDiff(parsers(filepath1), parsers(filepath2))));
  });

program.parse(process.argv);
