'use strict';
/**
 * @ngdoc function
 * @name stacksonstacksApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('stacksonstacksApp')
  .controller('LoginCtrl', function ($scope, simpleLogin, $location) {
    $scope.passwordLogin = function(email, pass) {
      login('password', {
        email: email,
        password: pass,
        rememberMe: true
      });
    };

    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        simpleLogin.createAccount(email, pass/*, name*/)
          .then(function() {
            $location.path('/chat');
          }, function(err) {
            $scope.err = err;
          });
      }
    };



    function login(provider, opts) {
      $scope.err = null;
      simpleLogin.login(provider, opts).then(
        function() {
          $location.path('/chat');
        },
        function(err) {
          $scope.err = err;
        }
      );
    }

  });
