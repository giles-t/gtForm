'use strict';

// 
// gtForm.validate
// 
// Directive to combine with ui.popover to insert elegant form validation icons with popovers
// 

angular.module('gtForm.validate').
  directive('gtFormValidate', ['$compile', function ($compile) {
    return {
      restrict: 'EA',
      require: '?ngModel',
      link: function (scope, elem, attrs, ngModel) {
        if (!ngModel) {
          return;
        }

        // Compiles the popover directive and adds the fail/success icons after the input field.
        var compiled = $compile('<span class="dtv-validate"><button class="success" tabindex="-1"></button><button ng-click="focus($event)" class="fail" popover="'+attrs.errorPopover+'" tabindex="-1"></button></span>')(scope);
        elem.after(compiled);

        // IE/Firefox/Safari don't properly fire focus on button click
        scope.focus = function (e) {
          e.target.focus();
        };

        // If no "required" attribute add "ng-empty" class when input is empty
        if (!attrs.required) {
          scope.$watch(attrs.ngModel, function (newVal) {
            if (ngModel.$isEmpty(newVal)) {
              attrs.$addClass('ng-empty');
            } else {
              attrs.$removeClass('ng-empty');
            }
          });
        }

      }
    };
  } ]);
