angular.module('bpmn').
directive('startEvent', function() {
    return {
        restrict: 'E',
        scope: {
            event: "="
        },
        replace: true,
        templateUrl: 'js/event.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'event',
        bindToController: true,
        controller: function() {
            this.bounds = this.event.di.Bounds[0].$;
            this.type = 'start';
            // Label
            if(this.event.di.BPMNLabel) {
                this.label = this.event.di.BPMNLabel[0].Bounds[0].$;
                this.label.x -= this.bounds.x;
                this.label.y -= this.bounds.y;
            }
        }
    };
});
