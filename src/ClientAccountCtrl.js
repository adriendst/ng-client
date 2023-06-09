(function () {

    angular
        .module('ClientApp')
        .controller('ClientAccountCtrl', [
            '$scope', '$rootScope', '$state', '$q', '$mdMedia', '$mdDialog', 'gettext', 'gettextCatalog',
            'toastr', '$http', 'UserService', 'UserProfileService',
            ClientAccountCtrl
        ]);

    /**
     * Account Controller for the Client module
     */
    function ClientAccountCtrl($scope, $rootScope, $state, $q, $mdMedia, $mdDialog, gettext, gettextCatalog,
                              toastr, $http, UserService, UserProfileService) {
        $scope.password = {
            old: '',
            new: '',
            confirm: ''
        }

        $scope.typePassword = false;

        $scope.refreshProfile = function () {
            UserProfileService.getProfile().then(function (data) {
                // Keep only the fields that matters for a clean PATCH
                $scope.user = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    isTwoFactorAuthEnabled: data.isTwoFactorAuthEnabled,
                    remainingRecoveryCodes: data.remainingRecoveryCodes,
                    mospApiKey: data.mospApiKey,
                };

                validateMospApiKey().then(function(data){
                  $scope.acceptMospApiKey = data
                });
            });
        };

        $scope.updateProfile = function () {
            validateMospApiKey().then(function(data){
              $scope.acceptMospApiKey = data;
              if (data !== false) {
                UserProfileService.updateProfile($scope.user, function (data) {
                    toastr.success(gettextCatalog.getString('Your profile has been edited successfully'), gettext('Profile edited'));
                });
              }
            });

      }

        $scope.deleteProfile = function (ev) {
            var confirm = $mdDialog.confirm()
                .title(gettextCatalog.getString('Are you sure you want to delete your account?',
                    {firstname: $scope.user.firstname, lastname: $scope.user.lastname}))
                .textContent(gettextCatalog.getString('This operation is irreversible.'))
                .targetEvent(ev)
                .theme('light')
                .ok(gettextCatalog.getString('Delete'))
                .cancel(gettextCatalog.getString('Cancel'));
            $mdDialog.show(confirm).then(function() {
                UserProfileService.deleteProfile($scope.user, function (data) {
                    $state.transitionTo('login');
                });
                $state.transitionTo('login');
            });
        };

        $scope.updatePassword = function () {
            $http.put('api/user/password/' + UserService.getUserId(), $scope.password).then(function (data) {
                if (data.data.status == 'ok') {
                    toastr.success(gettextCatalog.getString('Your password has been updated successfully'));
                }
            })
        };

        $scope.activateAuthenticatorApp = function (ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

          $mdDialog.show({
              controller: ['$scope', '$rootScope', '$mdDialog', 'toastr', '$http', 'user', activate2FADialogCtrl],
              templateUrl: 'views/dialogs/activate.2FA.html',
              targetEvent: ev,
              preserveScope: true,
              scope: $scope,
              clickOutsideToClose: false,
              fullscreen: useFullScreen,
              locals: {
                user : UserService.getUserId()
              }
          })
              .then(function (user) {
                let params = {
                  headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                  }
                };

                let data = {
                  'verificationCode': user.verificationCode,
                  'secretKey': user.secretKey
                }

                $http.post('api/user/activate2FA/' + UserService.getUserId(), data, params)
                  .then(function(result){
                    if (result.data.status) {
                        $scope.user.isTwoFactorAuthEnabled = true;
                        $scope.user.remainingRecoveryCodes = 0;
                        toastr.success(gettextCatalog.getString('Two-factor authentication is now activated.'), gettextCatalog.getString('Two-factor authentication'));
                    }else {
                        $scope.activateAuthenticatorApp(ev);
                        toastr.error(gettextCatalog.getString('Two-factor authentication failed'), gettextCatalog.getString('Error'));
                    }

                }, function(error){
                  toastr.error(error.data.message, gettextCatalog.getString('Error when enabling two-factor authentication.'));
                });

              }, function (reject) {
                $scope.handleRejectionDialog(reject);
              });
        };

        $scope.deactivateAuthenticatorApp = function (ev) {
            var confirm = $mdDialog.confirm()
                .title(gettextCatalog.getString('Disable two-factor authentication'))
                .textContent(gettextCatalog.getString('Are you sure you want to disable two-factor authentication?'))
                .targetEvent(ev)
                .ok(gettextCatalog.getString('Disable'))
                .theme('light')
                .cancel(gettextCatalog.getString('Cancel'));
            $mdDialog.show(confirm).then(function() {
              $http.delete('api/user/activate2FA/' + UserService.getUserId())
                .then(function(result){
                  $scope.user.isTwoFactorAuthEnabled = false;
                  toastr.success(gettextCatalog.getString('Two-factor authentication is now deactivated.'), gettextCatalog.getString('Two-factor authentication'));
              }, function(error){
                toastr.error(error.data.message, gettextCatalog.getString('Error when disabling two-factor authentication.'));
              });
            }, function (reject) {
              $scope.handleRejectionDialog(reject);
            });
        };

        $scope.regenerateToken = function () {
          let params = {
            headers : {
              'X-API-KEY' : $scope.user.mospApiKey,
              'Accept' : 'application/json'
            }
          };

          $http.get($rootScope.mospApiUrl + 'v2/user/me/regenerate-token', params).then(function (data){
            $scope.user.mospApiKey = data.data['api-key'];
            $scope.updateProfile();
          }, function(error){
            if (error.data.Error == "Account is not active.") {
              $mdDialog.show(activationMospAccountAlert);
            } else{
              toastr.error(error.data.Error, gettextCatalog.getString('Error'));
            }
          });
        };

        $scope.generateRecoveryCodes = function (ev) {
            var confirm = $mdDialog.confirm()
                .title(gettextCatalog.getString('New recovery codes'))
                .textContent(gettextCatalog.getString('Are you sure you want to generate new recovery codes ?'))
                .targetEvent(ev)
                .ok(gettextCatalog.getString('OK'))
                .theme('light')
                .cancel(gettextCatalog.getString('Cancel'));

            $mdDialog.show(confirm).then(function() {

              let params = {
                headers : {
                  'Accept' : 'application/json'
                },
                params :{
                }
              };

              $http.post('api/user/recoveryCodes/' + UserService.getUserId(), params).then(function (data) {
                  $scope.user.remainingRecoveryCodes = data.data.recoveryCodes.length;
                  $mdDialog.show({
                      controller: ['$scope', '$rootScope', '$mdDialog', 'toastr', '$http', 'user', 'recoveryCodes', displayRecoveryCodesDialogCtrl],
                      templateUrl: 'views/dialogs/display.recoverycodes.html',
                      targetEvent: ev,
                      preserveScope: true,
                      scope: $scope,
                      clickOutsideToClose: false,
                      fullscreen: false,
                      locals: {
                        user : $scope.user,
                        recoveryCodes: data.data.recoveryCodes,
                      }
                  })
                  .then(function (result) {

                  }, function (reject) {
                    $scope.handleRejectionDialog(reject);
                  });

              }, function(error){
                toastr.error('Error', gettextCatalog.getString('Error when generating recovery codes.'));
              });

            }, function (reject) {
              $scope.handleRejectionDialog(reject);
            });
        };

        $scope.createMospAccount = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show({
                controller: ['$scope', '$rootScope', '$mdDialog', 'toastr', '$http', 'user', createMospAccountDialogCtrl],
                templateUrl: 'views/dialogs/create.mospAccount.html',
                targetEvent: ev,
                preserveScope: true,
                scope: $scope,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                  user : $scope.user
                }
            })
                .then(function (mospAccount) {

                  let params = {
                    headers : {
                      'Content-Type' : 'application/json',
                      'Accept' : 'application/json'
                    }
                  };

                  // get cryptographically strong random values for the API key
                  var byteArray = new Uint32Array(8);
                  window.crypto.getRandomValues(byteArray);
                  mospAccount.apikey = byteArray.join('');

                  $http.post($rootScope.mospApiUrl + 'v2/user/', mospAccount, params)
                  .then(function(data){
                    $scope.user.mospApiKey = mospAccount.apikey;
                    $scope.updateProfile();
                    toastr.success(gettextCatalog.getString('The MOSP account has been created successfully'), gettextCatalog.getString('Creation successful'));
                  }, function(error){
                    toastr.error(error.data.message, gettextCatalog.getString('Error'));
                  });

                }, function (reject) {
                  $scope.handleRejectionDialog(reject);
                });
        };

        var activationMospAccountAlert = $mdDialog.alert()
            .title(gettextCatalog.getString('Activation MOSP account'))
            .textContent(gettextCatalog.getString('A verification email has been sent to you. Open this email and click the link to activate your account.'))
            .theme('light')
            .ok(gettextCatalog.getString('Close'))

        function validateMospApiKey() {
          let promise = $q.defer();
          if ($scope.user.mospApiKey) {
            let params = {
                headers : {
                  'X-API-KEY' : $scope.user.mospApiKey,
                  Accept : 'application/json'
                }
            };

            $http.get($rootScope.mospApiUrl + 'v2/user/me', params)
              .then(function (){
                promise.resolve(true);
              }, function (data){
                if (data.data.Error == "Account is not active.") {
                  $mdDialog.show(activationMospAccountAlert);
                  promise.resolve(true);
                } else {
                  toastr.error(gettextCatalog.getString('Wrong MOSP API Key. Try again.'), data.data.Error);
                  promise.resolve(false);
                }
            });
          }else {
            promise.resolve(undefined);
          }
          return promise.promise;
        }

        $scope.togglePassword = function () {
          $scope.typePassword = !$scope.typePassword;
        }

        // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
        $scope.escapeRegExp = function (str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
    }

    function activate2FADialogCtrl($scope, $rootScope, $mdDialog, toastr, $http, user, gettextCatalog) {

      $scope.user = {
          secretKeyQrCode: '',
          secretKey: '',
          verificationCode: '',
          isTwoFactorAuthEnabled: $scope.user.isTwoFactorAuthEnabled,
      };

      let params = {
        headers : {
          'Accept' : 'application/json'
        },
        params :{
        }
      };

      $http.get('api/user/activate2FA/' + user, params).then(function (data) {
          $scope.user.secretKeyQrCode = data.data.qrcode;
          $scope.user.secretKey = data.data.secret;
          $scope.user.verificationCode = $scope.user.verificationCode;
      }, function(error){
        toastr.error('Error', gettextCatalog.getString('Error when enabling two-factor authentication.'));
      });

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.create = function() {
        $mdDialog.hide($scope.user);
      };
    }

    function displayRecoveryCodesDialogCtrl($scope, $rootScope, $mdDialog, toastr, $http, user, recoveryCodes, gettextCatalog) {

      $scope.recoveryCodes = recoveryCodes;

      $scope.ok = function() {
        $scope.recoveryCodes = "";
        $mdDialog.hide($scope.user);
      };
    }

    function createMospAccountDialogCtrl($scope, $rootScope, $mdDialog, toastr, $http, user) {

        let params = {
          headers : {
            'Accept' : 'application/json'
          },
          params :{
            'is_membership_restricted' : false,
          }
        };

        $http.get($rootScope.mospApiUrl + 'v2/organization/', params).then(function (data){
          $scope.mospOrganizations = data.data.data;
          $scope.mospAccount = {
            login : (user.firstname + '.' + user.lastname).toLowerCase(),
            email: user.email,
          }
        }, function(error){
          toastr.error(error.data.Error, gettextCatalog.getString('Error'));
        });


        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.create = function() {
            $mdDialog.hide($scope.mospAccount);
        };
    }

})();
