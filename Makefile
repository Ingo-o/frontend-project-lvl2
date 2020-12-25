install:
	npm install

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest

diff:
	bin/getdiff.js __fixtures__/file1.json __fixtures__/file2.json

