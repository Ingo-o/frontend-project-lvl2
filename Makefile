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

test-coverage:
	npx -n --experimental-vm-modules jest --coverage

diff-s:
	bin/getdiff.js __fixtures__/1.yaml __fixtures__/2.json

diff-p:
	bin/getdiff.js -f plain __fixtures__/1.yaml __fixtures__/2.json




