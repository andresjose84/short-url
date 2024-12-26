## Build

docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build

## Run

docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d

## Note

By default, __docker-compose__ uses the ```.env``` file, so if you have the .env file and configure it with your production environment variables, you can simply run:

```
docker-compose -f docker-compose.prod.yaml up --build
```
