angular.module('MainApp', [])
  .controller('mainController', function($scope, $http) {

    $scope.newCamiseta = {};
    $scope.camisetas = [];
    $scope.selected = false;

    // Mensajes para mostrar en pantalla
    $scope.mensaje = '';
    $scope.error = '';

    // Campos de búsqueda
    $scope.busqueda = {
      id: '',
      color: ''
    };

    const jsonConfig = {
      headers: { 'Content-Type': 'application/json' }
    };

    function limpiarMensajes() {
      $scope.mensaje = '';
      $scope.error = '';
    }

    function mostrarError(err) {
      if (err.data && err.data.error) {
        $scope.error = err.data.error;
      } else {
        $scope.error = 'Ha ocurrido un error en la operación.';
      }
    }

    // Cargar todas las camisetas
    function cargarCamisetas() {
      limpiarMensajes();

      $http.get('/api/camisetas')
        .then(function(res) {
          $scope.camisetas = res.data;
        })
        .catch(function(err) {
          mostrarError(err);
        });
    }

    cargarCamisetas();

    // Buscar camisetas
    $scope.buscarCamisetas = function() {
      limpiarMensajes();

      const params = {};

      if ($scope.busqueda.id) {
        params.id = $scope.busqueda.id;
      } else if ($scope.busqueda.color) {
        params.color = $scope.busqueda.color;
      }

      $http.get('/api/camisetas', { params: params })
        .then(function(res) {
          $scope.camisetas = res.data;

          if (res.data.length === 0) {
            $scope.mensaje = 'No se encontraron camisetas.';
          } else {
            $scope.mensaje = 'Búsqueda realizada correctamente.';
          }
        })
        .catch(function(err) {
          $scope.camisetas = [];
          mostrarError(err);
        });
    };

    // Mostrar todas
    $scope.mostrarTodas = function() {
      $scope.busqueda = { id: '', color: '' };
      cargarCamisetas();
    };

    // Crear
    $scope.registrarCamiseta = function() {
      limpiarMensajes();

      $http.post('/api/camisetas', $scope.newCamiseta, jsonConfig)
        .then(function(res) {
          $scope.newCamiseta = {};
          $scope.selected = false;
          cargarCamisetas();
          $scope.mensaje = 'Camiseta creada correctamente.';
        })
        .catch(function(err) {
          mostrarError(err);
        });
    };

    // Modificar
    $scope.modificarCamiseta = function(camiseta) {
      limpiarMensajes();

      const c = camiseta || $scope.newCamiseta;
      if (!c || !c._id) return;

      $http.put('/api/camisetas/' + c._id, c, jsonConfig)
        .then(function(res) {
          $scope.newCamiseta = {};
          $scope.selected = false;
          cargarCamisetas();
          $scope.mensaje = 'Camiseta modificada correctamente.';
        })
        .catch(function(err) {
          mostrarError(err);
        });
    };

    // Borrar
    $scope.borrarCamiseta = function(camiseta) {
      limpiarMensajes();

      const c = camiseta || $scope.newCamiseta;
      if (!c || !c._id) return;

      $http.delete('/api/camisetas/' + c._id)
        .then(function(res) {
          $scope.newCamiseta = {};
          $scope.selected = false;
          cargarCamisetas();
          $scope.mensaje = 'Camiseta eliminada correctamente.';
        })
        .catch(function(err) {
          mostrarError(err);
        });
    };

    // Seleccionar camiseta
    $scope.selectCamiseta = function(camiseta) {
      limpiarMensajes();
      $scope.newCamiseta = angular.copy(camiseta);
      $scope.selected = true;
      $scope.selectedId = camiseta._id;
    };

    // Limpiar formulario
    $scope.limpiarFormulario = function() {
      $scope.newCamiseta = {};
      $scope.selected = false;
      $scope.selectedId = null;
      limpiarMensajes();
    };

  });