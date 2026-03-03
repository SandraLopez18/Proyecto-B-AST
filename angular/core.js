angular.module('MainApp', [])
  .controller('mainController', function($scope, $http) {

    $scope.newCamiseta = {};
    $scope.camisetas = [];
    $scope.selected = false;

    const jsonConfig = {
      headers: { 'Content-Type': 'application/json' }
    };

    // 🔹 Cargar todas las camisetas
    function cargarCamisetas() {
      $http.get('/api/camisetas')
        .then(function(res) {
          $scope.camisetas = res.data;
        })
        .catch(function(err) {
          console.log('Error:', err);
        });
    }

    cargarCamisetas();

    // 🔹 Crear
    $scope.registrarCamiseta = function() {
      $http.post('/api/camisetas', $scope.newCamiseta, jsonConfig)
        .then(function(res) {
          $scope.newCamiseta = {};
          cargarCamisetas();
          $scope.selected = false;
        })
        .catch(function(err) {
          console.log('Error:', err);
        });
    };

    // 🔹 Modificar
    $scope.modificarCamiseta = function(camiseta) {
      const c = camiseta || $scope.newCamiseta;
      if (!c || !c._id) return;

      $http.put('/api/camisetas/' + c._id, c, jsonConfig)
        .then(function(res) {
          $scope.newCamiseta = {};
          cargarCamisetas();
          $scope.selected = false;
        })
        .catch(function(err) {
          console.log('Error:', err);
        });
    };

    // 🔹 Borrar
    $scope.borrarCamiseta = function(camiseta) {
      const c = camiseta || $scope.newCamiseta;
      if (!c || !c._id) return;

      $http.delete('/api/camisetas/' + c._id)
        .then(function(res) {
          $scope.newCamiseta = {};
          cargarCamisetas();
          $scope.selected = false;
        })
        .catch(function(err) {
          console.log('Error:', err);
        });
    };

    // 🔹 Seleccionar
    $scope.selectCamiseta = function(camiseta) {
      $scope.newCamiseta = angular.copy(camiseta);
      $scope.selected = true;
    };

  });