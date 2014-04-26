'use strict';

// 
// gtForm.mask
// 
// Directive to mask the format of an input field
// 
// <input ng-model="phoneNumber" type="text" gt-form-mask="999-999-9999"  />
// 

angular.module('gtForm.mask').
  directive('gtFormMask', [function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, elem, attrs, ngModel) {
        if (!ngModel || !attrs.gtFormMask) {
          return;
        }

        var dividerPos = {},
            dividerRegExp = '',
            maskLength = attrs.gtFormMask.length;

        // set hard max-length on input
        attrs.$set('maxlength', maskLength);

        // stop angular from trimming whitespace on input
        attrs.$set('ngTrim', false);

        // build a hash of mask dividers
        for (var i = 0; i < maskLength; i++) {
          var maskChar = attrs.gtFormMask.charAt(i);
          if (maskChar !== '9' && maskChar.toUpperCase() !== 'X') {
            dividerPos[i] = maskChar;
            dividerRegExp += maskChar;
          }
        }

        // globally match all dividers to remove them from the model value
        var maskRegExp = new RegExp('['+dividerRegExp+']', 'g');

        // insert custom parser to validate our mask on model change
        ngModel.$parsers.splice(0, 0, (function (viewValue) {
          // if user is deletes characters automatically remove the inserted mask
          if (viewValue && viewValue.slice(-1) === dividerPos[viewValue.length - 1]) {
            elem.val(viewValue.slice(0, -1));
          } 
          // insert special chacter based on divider map
          else if (viewValue && dividerPos[viewValue.length]) {
            elem.val(viewValue + dividerPos[viewValue.length]);
          } 
          // replace all special characters in string and update model
          else if (viewValue && viewValue.length === maskLength) {
            return viewValue.replace(maskRegExp, '');
          }
        }));

      }
    };
  } ]);
