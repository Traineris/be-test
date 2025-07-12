VhiWEB Software Engineer Test Case

## API Development

- API menggunakan Express.js
- Database menggunakan MySQL
- Authentikasi menggunakan JWT
- Register menggunakan bcrypt
- CRUD menggunakan Sequelize ORM MySQL
- Testing dengan Postman

## Features

- User registrasi dan login
- CRUD Vendor dan Integrasi User
- CRUD Produk

## env

PORT=3009
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=db_be
JWT_SECRET=s3cr3tjwtkey

## Installation

1. Clone repository
2. Buat database MySQL dengan nama db_be beserta tabel yang diperlukan
3. Install dependencies dengan npm install
4. Jalankan dengan npm run dev

## API Documentation

- POST /login/
- GET /user/
- GET /user/:id
- POST /user/register
- PUT /user/:id
- DELETE /user/:id
- GET /vendor/
- GET /vendor/:id
- POST /vendor/
- PUT /vendor/:id
- DELETE /vendor/:id
- GET /produk/
- GET /produk/:id
- POST /produk/
- PUT /produk/:id
- DELETE /produk/:id
