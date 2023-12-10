(en desarrollo)

Sol - Model
Vero - Controller
Grace - Routes & schema
Martu - Middlewares & utils, index dev,app ,constants

Sistema de BD : Neon ( https://neon.tech/)

# Proyecto Final - Backend 14 - ADA ITW

Integrantes:

    Graciela Benbassat
    Martina Rivero
    Sol Lereah
    Verónica Espejo

### Descripción:

Sistema de autenticación de usuarios, con arquitectura REST y MVC, que permite:

- Register: Crear un nuevo usuario
- Login: Inicio de sesión
- Logout: Cierre de sesión
- Update: Actualizar la información relativa a un usuario
- Delete: Eliminar un usuario

La entidad usuario tiene los siguientes campos:

id: string
username: string
fullname: string
password: string (8 caracteres como minimo, debe incluir numeros, letras en mayúsculas y minúsculas, y caracteres especiales)
email: string
birthdate: Date
nationality: string

## DER


## Estructura del Proyecto:

- src
  - constants
    - index.ts
  - controllers
    - user.ts
  - middlewares
    - request-logger.ts
    - token-validator.ts
    - wrong-method-handler.ts
    - wrong-url-handler.ts
  - models
    - database
      - index.ts
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


## Link de Postman:

https://api.postman.com/collections/29942288-af472555-44a6-42fc-b955-3744f24243ae?access_key=PMAT-01HH8JYPQYGKA3YNJT6NFJ22T3

### Endpoints

GET /api/v1/status
GET /v1/api/users/cWxk4Gmnd4eUAxTe6OQx
POST /v1/api/users/auth/token
 (seguir)
