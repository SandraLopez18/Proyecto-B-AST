# Proyecto-B-AST
# Proyecto CRUD - Tienda Online (Camisetas)

Proyecto desarrollado para la asignatura utilizando:

- Node.js
- Express
- MongoDB
- Mongoose
- AngularJS
- JSON

---

## Descripción

Aplicación web para la administración de artículos (camisetas) en una tienda online.

El sistema implementa una **API REST** y un **cliente web** que permite realizar operaciones **CRUD** sobre una base de datos de camisetas.

CRUD significa:

- **Create** → Crear camisetas
- **Read** → Consultar camisetas
- **Update** → Modificar camisetas
- **Delete** → Eliminar camisetas

Además permite:

- Buscar camisetas por **ID**
- Buscar camisetas por **color**

---

# Modelo de datos

Cada camiseta contiene los siguientes campos:

- **Modelo** (ENUM: BASICA, OVERSIZE, POLO)
- **Color** (ENUM: NEGRO, BLANCO, ROJO, AZUL, VERDE)
- **Material** (ENUM: ALGODON, POLIESTER, SEDA)
- **Cantidad** (Number, obligatorio, mínimo 0)
- **Precio** (Number, obligatorio, mínimo 0)

Validaciones implementadas:

- Campos obligatorios
- Restricción de valores mediante ENUM
- Cantidad y precio no pueden ser negativos
---

## Instalación

### 1️. Clonar repositorio

```
git clone https://github.com/SandraLopez18/Proyecto-B-AST.git
cd Proyecto-B-AST
```

### 2️. Instalar dependencias

```
npm install
```

### 3️. Iniciar MongoDB

```
sudo service mongod start
```

### 4️. Ejecutar servidor

```
node server.js
```

Servidor disponible en:

```
http://localhost:8080
```

Frontend:

```
http://localhost:8080/admin
```

---

## Endpoints API

### Obtener todas las camisetas
GET `/api/camisetas`

### Obtener camiseta por ID
GET `/api/camisetas/:id`

### Crear camiseta
POST `/api/camisetas`

### Modificar camiseta
PUT `/api/camisetas/:id`

### Eliminar camiseta
DELETE `/api/camisetas/:id`

---

## Pruebas con Postman

Se puede probar la API utilizando Postman enviando peticiones en formato JSON.

## Arquitectura del sistema

### 3 Frontends

- Artículos (admin)
- Comrpas (cliente)
- Usuarios

### 3 Backends

- Servicio de artículos : puerto 8080
- Servicio de compras : puerto 8081
- Servicio de usuarios : puerto 8082

### Base de datos
```
tiendaBD
    camisetas
    compras
    usuarios
```


## Esquemas de las colecciones

### Colección: camisetas
```
{
  _id: ObjectId,

  modelo: String (ENUM: BASICA, OVERSIZE, POLO),

  color: String (ENUM: NEGRO, BLANCO, ROJO, AZUL, VERDE),

  material: String (ENUM: ALGODON, POLIESTER, SEDA),

  cantidad: Number (required, min: 0),

  precio: Number (required, min: 0)
}
```

### Colección: compras
```
{
  _id: ObjectId,

  articuloId: ObjectId (referencia a camisetas),

  clienteId: ObjectId (referencia a usuarios),

  cantidad: Number (required, min: 1),

  nombreComprador: String (required),

  direccionEnvio: String (required),

  fecha: Date
}
```

### Colección: usuarios
```
{
  _id: ObjectId,

  rol: String (ENUM: ADMIN, CLIENTE)
}
```

En MongoDB no definimos tipos estrictos como en SQL, pero usamos Mongoose para definir esquemas con tipos y restricciones. Por ejemplo, usamos campos enumerados para limitar valores y validaciones para evitar datos incorrectos.

En vez de **JOIN** hacemos llamadas entre microservicios

Ejemplo:
1. compras - obtiene compra
2. usa `articuloId`
3. llama al microservicios de artículos `GET /api/camisetas/:id`

**NO podemos acceder a la colección de usuarios directamente**

Grupo B - Proyecto CRUD Tienda Online
