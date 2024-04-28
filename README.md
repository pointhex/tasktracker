## Build Docker Image

```bash
docker build -t tasktracker .
docker run -it -p 3000:3000 tasktracker
```

## Run and with Docker Compose: app + database

```bash
docker compose build tasktracker
docker compose up -d
```

## Stop Compose
```bash
docker compose down
```
