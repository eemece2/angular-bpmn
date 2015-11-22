angular.module('bpmn').
directive('parallelGateway', function() {
    return {
        restrict: 'E',
        scope: {
            gateway: "="
        },
        replace: true,
        templateUrl: 'js/gateway.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'gateway',
        bindToController: true,
        controller: function() {
            this.bounds = this.gateway.di.Bounds[0].$;
            this.type = 'parallel';
            // Label
            if(this.gateway.di.BPMNLabel) {
                this.label = this.gateway.di.BPMNLabel[0].Bounds[0].$;
                this.label.x -= this.bounds.x;
                this.label.y -= this.bounds.y;
            }
        }
    };
});
