# Proyecto Final - Backend 14 - ADA ITW

Integrantes:

    Graciela Benbassat
    Martina Rivero
    Sol Lereah
    Verónica Espejo

    Tareas (borrarlo)

    Sol - Model
    Vero - Controller
    Grace - Routes & schema
    Martu - Middlewares & utils, index, dev, app, constants

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
- password: string (8 caracteres como minimo, debe incluir numeros, letras en mayúsculas y minúsculas, y caracteres especiales)
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
  - middlewares
    - request-logger.ts
    - token-validator.ts
    - wrong-method-handler.ts
    - wrong-url-handler.ts
  - models
    - database
      - index.ts
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


## Links de Postman:

- WEB
  https://universal-crater-143962.postman.co/workspace/88539435-957a-44d4-9642-baaa6ebad78b/request/29858323-24f0c4c1-acd7-403d-a330-811b736f18a5

### Endpoints  

(Corregir agregando auth/token donde corresponda)

- Get API status (No fue solicitado)
  GET /v1/api/status 

{   
    "name":"tp--final",
    "version":"1.0.0",
    "description":"",
    "author":"",
    "server":"running",
    "database":"connected"
}

- Register: Crear un nuevo usuario
  POST /v1/api/users/fb1da8d1-9e4b-4c00-a688-40b051780b28
 
  {
    "username": "test",
    "fullname": "test test",
    "password": "12345678",
    "email": "test@gmail.com",
    "birthdate": "01/01/1980",
    "nationality": "Argentina"
  }

- Login: Inicio de sesión
  POST /v1/api/users/login

  {
    "email":"test@test.com",
    "password":"a1234tt78"
  }

- Update: Actualizar la información relativa a un usuario
  PATCH /V1/api/users/fb1da8d1-9e4b-4c00-a688-40b051780b28

  {  
    "birthdate": "12.12.1990" 
  }

- Delete: Eliminar un usuario
  DELETE /v1/api/users/fb1da8d1-9e4b-4c00-a688-40b051780b28

- Logout: Cierre de sesión
  DELETE /v1/api/logout/fb1da8d1-9e4b-4c00-a688-40b051780b28

- Get all Users (no ue solicitado)
  GET /v1/api/users/all

- Get User  (no fue solicitado)
  GET /v1/api/users/fb1da8d1-9e4b-4c00-a688-40b051780b28




