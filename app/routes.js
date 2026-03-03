const path = require('path');
const Controller = require('./controller');

module.exports = function(app) {
  // API Camisetas
  app.get('/api/camisetas', Controller.getCamiseta);
  app.get('/api/camisetas/:id', Controller.getCamisetaById);
  app.post('/api/camisetas', Controller.setCamiseta);
  app.put('/api/camisetas/:id', Controller.updateCamiseta);
  app.delete('/api/camisetas/:id', Controller.removeCamiseta);

  // Front
  app.use('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'angular', 'index.html'));
  });
};