describe('Unit testing "Process" directive', function() {
    var $compile, $rootScope;
    var element;
    var taskName = "TestingTaskName";
    var taskBounds = { x: '10', y: '20', width: '100', height: '80' };

    // Load the bpmn module, which contains the directive
    beforeEach(module('bpmn', 'bpmn.templates'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        var task = {
            '$': { id: 1, name: taskName },
            di: {
                Bounds: [{ '$': taskBounds }]
            }
        };

        $rootScope.process = { task: [ task ] };


        // Compile HTML containing the directive
        var html ='<process process="process"></process>';
        element = $compile(html)($rootScope);
        $rootScope.$digest();
    }));

    it('has "task" element', function() {
        var tasks = element[0].querySelectorAll('g rect.task');
        expect(tasks.length).toBe(1);
    });

});
