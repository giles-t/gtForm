'use strict';

// 
// gtForm.match
// 
// Directive to check if 2 input field values match
//
// Usage:
//   <input required ng-model="email" type="email" gt-form-match="{{confirmEmail}}" />
//   ...
//   <input required ng-model="confirmEmail" type="email" gt-form-match="{{email}}" />
//

angular.module('gtForm.match')
  .directive('gtFormMatch', [function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, elem, attrs, ngModel) {
        if (!ngModel) {
          return;
        }

        scope.$watch(attrs.ngModel, function() {
          validate();
        });

        attrs.$observe('gtFormMatch', function(val) {
          validate();
        });

        var validate = function () {
          var v1 = ngModel.$viewValue;
          var v2 = attrs.gtFormMatch;
          // Set validity
          if (v1 && v2 && (v1.length > 0) && (v2.length > 0)) {
            ngModel.$setValidity('gtFormMatch', v1 === v2);
          }
        };
      }
    };
  } ]);