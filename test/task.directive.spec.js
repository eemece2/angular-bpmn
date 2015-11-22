describe('Unit testing Task directive', function() {
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

        $rootScope.task = {
            '$': { id: 1, name: taskName },
            di: {
                Bounds: [{ '$': taskBounds }]
            }
        };

        // Compile HTML containing the directive
        element = $compile("<task task='task'></task>")($rootScope);
        $rootScope.$digest();
    }));

    it('has "g" element', function() {
        //var gs = element.find('g');
        //expect(gs.length).toBe(1);
        expect(element.attr('transform')).toBe("translate(" + taskBounds.x + "," + taskBounds.y + ")");
    });

    it('has "rect" element', function() {
        var rects = element.find('rect');
        expect(rects.length).toBe(1);
    });

    it('has "rect" element, with "task" class', function() {
        var rects = element[0].querySelectorAll('rect.task');
        expect(rects.length).toBe(1);
    });

    it('has correct task name on label', function() {
        var texts = element.find('text');
        expect(texts.eq(0).html()).toBe(taskName);
    });

    it('has correct dimensions', function() {
        var texts = element.find('rect');
        expect(texts.eq(0).attr('width')).toBe(taskBounds.width);
    });
});
