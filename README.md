(en desarrollo)

Sol - Model
Vero - Controller
Grace - Routes & schema
Martu - Middlewares & utils, index dev,app ,constants

Sistema de BD : Neon ( https://neon.tech/)


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

    Link de Postman:

    https://api.postman.com/collections/29942288-af472555-44a6-42fc-b955-3744f24243ae?access_key=PMAT-01HH8JYPQYGKA3YNJT6NFJ22T3