angular.module('bpmn').
directive('lane', function() {
    return {
        restrict: 'E',
        scope: {
            lane: "="
        },
        replace: true,
        templateUrl: 'js/lane.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'lane',
        bindToController: true,
        controller: function() {
            this.bounds = this.lane.di.Bounds[0].$;
            // Label
            this.label = {
                x: - this.bounds.height / 2,
                y: 20
            };
        }
    };
});
