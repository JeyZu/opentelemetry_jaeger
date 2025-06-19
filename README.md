# OpenTelemetry Jaeger Demo

This project demonstrates a minimal distributed tracing setup between a Node.js service and a Go service using [OpenTelemetry](https://opentelemetry.io/) and [Jaeger All-in-One](https://www.jaegertracing.io/).

## Project structure

- `service-js/` – simple Express server calling the other js service
- `docker-compose.yaml` – launches both services and Jaeger

## Quick start

Clone the repo and run:

```bash
docker compose up --build
```

Open `http://localhost:16686` to access the Jaeger UI. Jaeger 2.6 exposes an
OTLP endpoint on `4318` which the services use to send traces. You should see
spans from `service-js` calling `service-go`.
