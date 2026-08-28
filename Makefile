

update-js-libs:
	docker run -ti --rm -u `id -u`:`id -g` -v `pwd`:/src node:20 sh -c "cd /src && npm install"
	./update-js-libs.sh