# OpenJira App

* If you want to run the application in production mode, you need to create a docker-compose.yml file with the following content:
```
services: 
  entriesdb: 
    image: mongo:5.0.0
    container_name: entries-database
    ports:
      - 27017:27017    
    volumes:
      - ./mongo:/data/db
```

* To run locally the application you need a database. You can create one with the following command:
```
docker-compose up -d
```

* The -d means __detached__

* MongoDB url:
```
 mongodb://localhost:27017/entriesdb  
```

## Set environment variables

* Rename the .env.template file to .env

* To use environment variables on the client side it is necessary to change the following line in the .env file:
```
MONGODB_URL=mongodb://localhost:27017/entriesdb
```
to:
```
NEXT_PUBLIC_MONGODB_URL=mongodb://localhost:27017/entriesdb  
```

* Filling the database with test data:
```
http://localhost:3000/api/seed
```