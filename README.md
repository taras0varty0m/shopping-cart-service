The first launch

```bash
# installation
$ npm install

# env
cp .env.example .env

# docker-compose
$ docker-compose up -d

# migrations & seed
$ npx prisma migrate dev

# app
$ npm run start:dev
```

Access the project at http://localhost:3000/api

credentials for users

```json
[
  {
    "email": "qwe@qwe.qwe",
    "password": "password"
  },
  {
    "email": "qwe@qwe.qwe",
    "password": "password"
  }
]
```
