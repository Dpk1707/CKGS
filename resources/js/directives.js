var app = angular.module('ckgsPWA.directives', []);

app.directive("showErrors",function($timeout){
  return{
    restrict:'A',
    require:'^form',
    link:function(scope,el,attrs,formCtrl){
      var inputEl   = el[0].querySelector("[name]");
      var inputNgE1 = angular.element(inputEl);
      var inputname =inputNgE1.attr('name');
      var helpText  = angular.element(el[0].querySelector("help-block"));
      inputNgE1.bind('change',function(){
        el.toggleClass('has-error',formCtrl[inputname].$invalid);
        //helpText.toggleClass('hide',formCtrl[inputname].$valid );
      })

      scope.$on('show-error-event',function(){
        el.toggleClass('has-error',formCtrl[inputname].$invalid);
      })
      scope.$on('hide-error-event',function(){
        $timeout(function(){
          el.removeClass('has-error');
        },0,false)
      })
    }
  }

});

app.directive('a', function() {
  return {
    restrict: 'E',
    link: function(scope, elem, attrs) {
      if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
        elem.on('click', function(e) {
          e.preventDefault(); // prevent link click for above criteria
        });
      }
    }
  };
});



app.directive('html', function() {
    function link(scope, element, attrs) {
        var update = function() {
            element.html(scope.html);
        }
        attrs.$observe('html', function(value) {
            update();
        });
    }
    return {
        link: link,
        scope:  {
            html:   '='
        }
    };
});

app.directive('bindHtmlUnsafe', function( $parse, $compile ) {
    return function( $scope, $element, $attrs ) {
        var compile = function( newHTML ) {
            newHTML = $compile(newHTML)($scope);
            $element.html('').append(newHTML);        
        };
        var htmlName = $attrs.bindHtmlUnsafe;
        $scope.$watch(htmlName, function( newHTML ) {
            if(!newHTML) return;
            compile(newHTML);
        });
   
    };
});

app.directive('compile', ['$compile', function ($compile) {
      return function(scope, element, attrs) {
          scope.$watch(
            function(scope) {
               // watch the 'compile' expression for changes
              return scope.$eval(attrs.compile);
            },
            function(value) {
              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
            }
        );
    };
}]);

app.directive('bindHtmlCompile', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(function () {
        return scope.$eval(attrs.bindHtmlCompile);
      }, function (value) {
        // Incase value is a TrustedValueHolderType, sometimes it
        // needs to be explicitly called into a string in order to
        // get the HTML string.
        element.html(value && value.toString());
        // If scope is provided use it, otherwise use parent scope
        var compileScope = scope;
        if (attrs.bindHtmlScope) {
          compileScope = scope.$eval(attrs.bindHtmlScope);
        }
        $compile(element.contents())(compileScope);
      });
    }
  };
}]);

app.filter('unsafe', function($sce) {
  return function(val) {
      return $sce.trustAsHtml(val);
  };
});

app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

app.filter('trustAs', ['$sce', 
    function($sce) {
        return function (input, type) {
            if (typeof input === "string") {
                return $sce.trustAs(type || 'html', input);
            }
            console.log("trustAs filter. Error. input isn't a string");
            return "";
        };
    }
]);

app.directive('ngBindHtmlUnsafe', [function() {
    return function(scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
        scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
            element.html(value || '');
        });
    }
}]);
