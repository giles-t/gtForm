'use strict';

// 
// gtForm.btnDisable
// 
// On click disables all "button" elements with attched directive and replaces target element with disabled class for specific styling
// 

angular.module('gtForm.btnDisable').
  directive('gt-form-btn-disable', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {

        elem.bind('click', function () {
          attrs.$addClass('gt-form-btn-disable');
          attrs.$set('disabled', 'disabled');
          $rootScope.$broadcast('gtFormBtnDisable', true);
        });

        scope.$on('gtFormBtnDisable', function (event, args) {
          if (args) {
            attrs.$set('disabled', 'disabled');
          } else {
            attrs.$removeClass('gt-form-btn-disable');
            elem.removeAttr('disabled');
          }
        });

      }
    };
  } ]);
