install:
	npm install

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-rel:
	bin/getdiff.js ../test-files/file1.json ../test-files/file2.json

test-abs:
	bin/getdiff.js /home/ingo/IT/test-files/file1.json /home/ingo/IT/test-files/file2.json	
