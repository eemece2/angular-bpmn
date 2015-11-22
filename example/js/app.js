angular.module('myApp', ['bpmn'])
.controller('AppCtrl', function($http) {

    var vm = this;

    $http.get('/bpmn').success(function(data) {
        vm.defs = data;

        vm.def = vm.defs[0];
        $http.get('/bpmn/' + vm.def).success(function(data) {
            vm.definitions = data.definitions;
        });
    });

    this.defChanged = function(def) {
        console.log(def);
        $http.get('/bpmn/' + def).success(function(data) {
            vm.definitions = data.definitions;
        });
    };
});
