angular.module('bpmn', ['bpmn.templates']).
directive('bpmn', function() {
    return {
        restrict: 'E',
        scope: {
            "definitions": "=",
            w: "=",
            h: "="
        },
        transclude: true,
        replace: true,
        templateUrl: 'js/bpmn.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'bpmn',
        bindToController: true,
        controller: function($scope) {
        }
    };
});

