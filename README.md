## Installation

```bash
$ npm install
```

## Running the app

```bash
# docker-compose
$ docker-compose up -d

# migrations & seed
$ npx prisma migrate dev

# development
$ npm run start
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
