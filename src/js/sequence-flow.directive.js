angular.module('bpmn').
directive('sequenceFlow', function(RounderService) {
    return {
        restrict: 'E',
        scope: {
            sf: "="
        },
        replace: true,
        templateUrl: 'js/sequence-flow.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'sf',
        bindToController: true,
        controller: function($scope) {
            // Label
            if(this.sf.di.BPMNLabel) {
                this.label = this.sf.di.BPMNLabel[0].Bounds[0].$;
            }
            // Waypoints
            var wpoints = this.sf.di.waypoint;
            this.wps = 'M' + wpoints[0].$.x + ',' + wpoints[0].$.y;
            for(var i = 1; i < wpoints.length; i++) {
                this.wps  += " L" + wpoints[i].$.x + "," + wpoints[i].$.y;
            }
            this.wps = RounderService(this.wps, 8);
        }
    };
});
