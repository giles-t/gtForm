'use strict';

// 
// gtForm.alerts
// 
// Directive to to display bootstrap alert messages with the ability to have multiple alert containers on a page
// 

angular.module('gtForm.alerts').
  directive('gt-form-alerts', ['$log', '$sce', function ($log, $sce) {
    return {
      restrict: 'EA',
      scope: {
        gtFormAlerts: '@'
      },
      template:
        '<div ng-repeat="a in alerts" class="alert alert-{{message.level.toLowerCase()}}">'+
          '<button ng-if="a.level.toLowerCase() === \'error\'" ng-click="closeAlert($index)" type="button" class="close" data-dismiss="alert">&times;</button>'+
          '<i class="icon icon-exclamation-sign"></i>'+
          '<span ng-bind-html="a.value"></span>'+
        '</div>',
      controller: ['$scope', function ($scope) {

        $scope.alerts = [];

        // Listen for broadcased alert messages
        $scope.$on('gtAlert', function(event, target, alerts) {
          if ($scope.gtFormAlerts === target) {
            $scope.alerts = alerts;
          }
        });

        $scope.closeAlert = function (index) {
          $scope.alerts.splice(index, 1);
        };

      }]
    };
  } ]);
