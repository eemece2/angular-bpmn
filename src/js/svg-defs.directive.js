angular.module('bpmn').
directive('svgDefs', function() {
    return {
        restrict: 'E',
        scope: {
        },
        replace: true,
        templateUrl: 'js/svg-defs.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'defs',
        bindToController: true,
        controller: function() {
        }
    };
});

