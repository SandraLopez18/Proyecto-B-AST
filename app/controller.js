// Importación del modelo de camiseta en Moongose
// Permite hacer operaciones contra MongoDB : find(), create ()
const Camiseta = require('./modelo/camiseta');


// Obtención de todos los objetos Camiseta de la base de datos

// Exportada para poder ser utilizada por otros archivos del proyecto
exports.getCamiseta = async function (req,res) {
    try {
        // Espera a que termine la consulta pudiendo atender otras (asíncrono)
        // lean() Moongose devuelve objetos JSON simples
        const camisetas = await Camiseta.find().lean();
        res.json(camisetas);    
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Obtener objeto Camiseta por su id
exports.getCamisetaById = async function (req, res) {
    try {
        const camiseta = await Camiseta.findById(req.params.id).lean();

        if (!camiseta) {
            return res.status(404).json({ error: 'Camiseta no encontrada' });
        }

        res.status(200).json(camiseta);
    } catch (error) {
        console.error(error);

        // Si el id no tiene formato válido de Mongo (ObjectId), Mongoose lanza CastError
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'ID inválido' });
        }

        res.status(500).send(error);
    }
};


// Guardar objeto Camiseta en BD
exports.setCamiseta = async function (req,res) {
    try {
        // req.body contiene los datos enviados desde Angular
        const nuevaCamiseta = await Camiseta.create({
            modelo: req.body.modelo,
            color: req.body.color,
            material: req.body.material,
            cantidad: req.body.cantidad,
            precio: req.body.precio
        });

        // Devolver solo el objeto creado
        res.status(201).json(nuevaCamiseta);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Modificación objeto Camiseta de la BD
exports.updateCamiseta = async function (req, res) {
  try {

    const { modelo, color, material, cantidad, precio } = req.body;

    // Verificar que vienen todos los campos
    if (
      modelo === undefined ||
      color === undefined ||
      material === undefined ||
      cantidad === undefined ||
      precio === undefined
    ) {
      return res.status(400).json({
        error: "En una petición PUT deben enviarse todos los campos del recurso."
      });
    }

    // Reemplazar completamente el documento
    const camisetaActualizada = await Camiseta.findByIdAndUpdate(
      req.params.id,
      {
        modelo,
        color,
        material,
        cantidad,
        precio
      },
      {
        runValidators: true,
        new: true   // devuelve el documento actualizado
      }
    );

    if (!camisetaActualizada) {
      return res.status(404).json({ error: "Camiseta no encontrada" });
    }

    // Devolver solo el recurso actualizado 
    res.status(200).json(camisetaActualizada);

  } catch (error) {
    console.error(error);

    // Si el id no tiene formato válido de Mongo (ObjectId), Mongoose lanza CastError
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }

    res.status(500).send(error);
  }
};

// Eliminación de un objeto Camiseta de la BD
exports.removeCamiseta = async function (req,res) {
    try {

        const deleted = await Camiseta.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Camiseta no encontrada" });
        }

        // Devolver el objeto eliminado 
        res.status(200).json(deleted);

    } catch (error) {
        console.error(error);

        // Si el id no tiene formato válido de Mongo (ObjectId), Mongoose lanza CastError
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'ID inválido' });
        }

        res.status(500).send(error);
    }
}