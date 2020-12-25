import getDiff from '../src/index.js';

test('compare two flat jsons', () => {
  expect(getDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});
