DOCKER_REPOSITORY_PREFIX ?= docker.io/mariadb
IMAGE_NAME = skysql-qos-data-exporter
VERSION ?= $(shell cat VERSION)
FULL_IMAGE = ${DOCKER_REPOSITORY_PREFIX}/${IMAGE_NAME}:${VERSION}

build:
	docker build -t ${FULL_IMAGE} .

push:
	docker push ${FULL_IMAGE}

release: build push

start_dev:
	docker-compose up --build

stop_dev:
	docker-compose down

clear_dev:
	docker-compose down -v && rm -rf ./data/*
