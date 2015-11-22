angular.module('bpmn').
directive('svgSymbols', function() {
    return {
        restrict: 'E',
        scope: {
        },
        replace: true,
        templateUrl: 'js/svg-symbols.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'symbols',
        bindToController: true,
        controller: function() {
        }
    };
});

