FROM golang:1.21-alpine AS build
WORKDIR /src
COPY go.mod .
RUN go mod download
COPY main.go .
RUN go build -o app

FROM alpine
WORKDIR /app
COPY --from=build /src/app .
EXPOSE 8080
CMD ["/app/app"]
