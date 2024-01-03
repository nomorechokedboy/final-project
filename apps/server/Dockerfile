FROM golang:1.21-alpine AS builder

WORKDIR /build
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
COPY go.mod go.sum ./
RUN go mod download && \
    go install github.com/swaggo/swag/cmd/swag@latest

COPY ./api ./api
COPY ./internals ./internals
COPY ./cmd ./cmd
COPY ./main.go .

RUN "$GOPATH"/bin/swag init && \
    go build -ldflags="-s -w" -o server .

FROM busybox:stable AS deps

ARG BUSYBOX_VERSION=1.31.0-i686-uclibc
ADD https://busybox.net/downloads/binaries/$BUSYBOX_VERSION/busybox_WGET /wget
RUN chmod a+x /wget

FROM gcr.io/distroless/static-debian11:nonroot AS runtime

COPY --from=deps /wget /usr/bin/wget
COPY --from=builder ["build/server", "/"]

ENTRYPOINT ["/server"]

