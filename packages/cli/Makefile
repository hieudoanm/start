APP := start
PKG := ./...

.PHONY: run build test clean

run:
	go run .

build:
	go build -o bin/$(APP)

build-linux:
	GOOS=linux GOARCH=amd64 go build -o bin/$(APP)-linux

build-mac:
	GOOS=darwin GOARCH=arm64 go build -o bin/$(APP)-mac

test:
	go test $(PKG)

clean:
	rm -rf bin
