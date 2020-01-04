# Start development docker containers

## Api

```bash
docker-compose run --rm --service-ports api
```

Copy `docker/api/.env` to `api/.env`.

The api will be running on [http://localhost:3001/api](http://localhost:3001/api).

## Frontend

```bash
docker-compose run --rm --service-ports frontend
```

The frontend will be running on [http://localhost:3000](http://localhost:3000).

# Destroy development docker containers

```bash
docker-compose down -v
```
