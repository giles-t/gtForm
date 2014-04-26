'use strict';

// 
// gtForm.initView
// 
// Directive to fire initView function on template compilation, another way to know if content is loaded in an ng-include
// 

angular.module('gtForm.initView').
  directive('gtFormInitView', [function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        if (scope.initView) {
          scope.initView();
        }
      }
    };
  } ]);
