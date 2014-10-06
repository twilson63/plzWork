'use strict';
/**
 * @ngdoc function
 * @name stacksonstacksApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('stacksonstacksApp')
  .controller('ChatCtrl', function ($firebaseSimpleLogin, $rootScope, $scope, simpleLogin, fbutil, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = fbutil.syncArray('messages', {limit: 10});

    var auth = $firebaseSimpleLogin(fbutil.ref());
    auth.$getCurrentUser().then(function (user) {
        $rootScope.currentUser = user;

    })


    $scope.users = fbutil.syncArray('users');

    // display any errors
    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage})
          // display any errors
          .catch(alert);
      }
    };


    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

    function loadProfile(user) {
      if( $scope.profile ) {
        $scope.profile.$destroy();
      }
      fbutil.syncObject('users/'+user.uid).$bindTo($scope, 'profile');
    }
  });

  // $scope.users = fbutil.syncArray('users');

  $scope.users.currentUser.collections = fbutil.syncArray('collections');
  $scope.addSomething = function (something) {
    var ref = fbutil.ref('users');
    ref.child($rootScope.currentUser.uid).child('collections').push(something);
  }
  $scope.addSomething = function(item) {
      if( newColItem ) {
        // push a message to the end of the array
        $scope.collections.$add(newColItem)
          // display any errors
          .catch(alert);
      }
    };
