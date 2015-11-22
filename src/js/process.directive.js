angular.module('bpmn').
directive('process', function() {
    return {
        restrict: 'E',
        scope: {
            "process": "=",
            w: "=",
            h: "="
        },
        replace: true,
        templateUrl: 'js/process.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'process',
        bindToController: true,
        controller: function($scope) {
        }
    };
});

