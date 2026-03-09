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


Grupo B - Proyecto CRUD Tienda Online
