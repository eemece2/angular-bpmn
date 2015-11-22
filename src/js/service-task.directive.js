angular.module('bpmn').
directive('serviceTask', function() {
    return {
        restrict: 'E',
        scope: {
            task: "="
        },
        replace: true,
        templateUrl: 'js/task.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'task',
        bindToController: true,
        controller: function() {
            this.bounds = this.task.di.Bounds[0].$;
            this.type = 'service';
            this.symbol = '#' + this.type + '-task';
            if(this.task.di.BPMNLabel) {
                this.label = this.task.di.BPMNLabel[0].Bounds[0].$;
                this.label.x -= this.bounds.x;
                this.label.y -= this.bounds.y;
            } else {
                // TODO: multiline labels (long texts: divide label)
                var yLabel = this.bounds.height / 2;
                this.label = { x: 10, y: yLabel, witdh: 80, height: 20 };
            }
        }
    };
});
