angular.module('bpmn').
directive('task', function() {
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
            this.prueba = 5;
            this.bounds = this.task.di.Bounds[0].$;
            this.type = '';
            this.symbol = '';
            if(this.task.di.BPMNLabel) {
                this.label = this.task.di.BPMNLabel[0].Bounds[0].$;
            } else {
                // TODO: multiline labels (long texts: divide label)
                var yLabel = this.bounds.height / 2;
                this.label = { x: 10, y: yLabel, witdh: 80, height: 20 };
            }
        }
    };
});
