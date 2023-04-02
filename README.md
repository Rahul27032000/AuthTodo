# Todo API with Authentication

**How to use**

```
git clone git@github.com:Rahul27032000/AuthTodo.git
cd AuthTodo
npm install

```

now you have to create one filed named .env

```
PORT = 3000
MONGO_USER = YourMongoUser
MONGO_PASS = YourMongoPassword

ACCESS_TOKEN ='your access token key'
REFRESH_TOKEN ='your refresh token key'


```

you have to put your own data in above code
you can generate secret key with

```
node
require("crypto").randomBytes(64).toString("hex")
```

**Technology used**

- Express
- Mongoose
- Nodemon
- Dotenv
- jsonwebtoken
- bcrypt

| Endpoint       | Method | Description                                                               |
| -------------- | ------ | ------------------------------------------------------------------------- |
| /api/register  | POST   | Register a new user with provided email and password.                     |
| /api/login     | POST   | Authenticate user credentials and return a JWT token for future requests. |
| /api/todos     | GET    | Get all todos of the authenticated user                                   |
| /api/todos     | POST   | Create a new todo for the authenticated user                              |
| /api/todos/:id | GET    | Get a specific todo of the authenticated user by ID                       |
| /api/todos/:id | PATCH  | Update an existing todo of the authenticated user by ID                   |
| /api/todos/:id | DELETE | Delete an existing todo of the authenticated user by ID                   |
