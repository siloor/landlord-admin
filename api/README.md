Install dependencies

```bash
npm install
```

Start the application:

```bash
npm start
```

The server will be running on [http://localhost:3000/api](http://localhost:3000/api).

Rename `.env.example` to `.env` and fill in environment details.

Run the migration:

```bash
./node_modules/.bin/sequelize db:migrate
```

Seed the database:

```bash
./node_modules/.bin/sequelize db:seed:all
```
