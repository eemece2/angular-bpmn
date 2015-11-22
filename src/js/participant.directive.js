angular.module('bpmn').
directive('participant', function() {
    return {
        restrict: 'E',
        scope: {
            participant: "="
        },
        replace: true,
        templateUrl: 'js/participant.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'participant',
        bindToController: true,
        controller: function() {
            this.bounds = this.participant.di.Bounds[0].$;
            // Label
            this.label = {
                'x': - this.bounds.height / 2,
                'y': 20
            };

            // TODO: isHorizontal: false
        }
    };
});
