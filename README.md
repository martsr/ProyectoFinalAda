# Proyecto Final - Backend 14 - ADA ITW

Integrantes:

    Graciela Benbassat
    Martina Rivero
    Sol Lereah
    Verónica Espejo

### Descripción:

Sistema de autenticación de usuarios, con arquitectura REST y MVC, que permite:

- Register: Crear de un nuevo usuario
- Login: Iniciar sesión
- Logout: Cerrar sesión
- Update: Actualizar la información relativa a un usuario
- Delete: Eliminar un usuario

La entidad usuario tiene los siguientes campos:

- id: string
- username: string
- fullname: string
- password: string (8 caracteres como mínimo, debe incluir numeros, letras en mayúsculas y minúsculas, y caracteres especiales)
- email: string
- birthdate: Date
- nationality: string


## Sistema de BD: 
  Neon ( https://neon.tech/)


## Estructura del Proyecto:

- src
  - constants
    - index.ts
  - controllers
    - user.ts
    - server.ts
  - logs
    - error.log
    - user.log
  - middlewares
    - request-logger.ts
    - token-validator.ts
    - wrong-method-handler.ts
    - wrong-url-handler.ts
  - models
    - database
      - index.ts
      - sync-db.ts
    - auth.ts
    - user.ts
  - researchs
    - paginacion.txt
    - refresh-tokens.txt
    - winston-js.txt
  - routes
    - index.ts
    - user.tx
  - schemas
    - user.ts
  - utils
    - jws.ts
    - logger.ts
    - password-hasher.ts
  - app.ts
  - dev.ts
  - index.ts
- .env
- .gitignore
- package-lock.json
- package.json
- README.md
- tsconfig.json


## Link de Postman:

- WEB
  https://universal-crater-143962.postman.co/workspace/88539435-957a-44d4-9642-baaa6ebad78b/request/29858323-24f0c4c1-acd7-403d-a330-811b736f18a5

### Endpoints  

- Register: Crear un nuevo usuario
  
  POST /v1/api/users

  {
    "username": "test",
    "fullname": "test test",
    "password": "A123&b45",
    "email": "test@gmail.com",
    "birthdate": "2010.05.25",
    "nationality": "Argentina"
  }

- Login: Inicio de sesión

  POST /v1/api/users/login

  {
    "email": "testpass@gmail.com",
    "password": "A123&b45"
  }  

- Update: Actualizar la información relativa a un usuario

  PATCH /V1/api/users/me

  {
    "email": "test@gmail.com",
    "fullname": "test update",
    "birthdate": "2001.12.03"
  }

- Delete: Eliminar un usuario

  DELETE /v1/api/users/me

  {"email": "email@gmail.com}

- Logout: Cierre de sesión

  DELETE /v1/api/logout 

  {"email": "email@gmail.com}





