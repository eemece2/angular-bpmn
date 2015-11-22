(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/bpmn.directive.html',
    '<svg id="{{bpmn.definitions.prueba.id}}" od="{{bpmn.dos.id}}" ng:attr:width="{{bpmn.w}}" ng:attr:height="{{bpmn.h}}" class="bpmn">\n' +
    '\n' +
    '   <svg-symbols></svg-symbols>\n' +
    '\n' +
    '   <svg-defs></svg-defs>\n' +
    '\n' +
    '   <participant ng-repeat="participant in bpmn.definitions.collaboration[0].participant" participant="participant"></participant>\n' +
    '\n' +
    '   <process ng-repeat="process in bpmn.definitions.process" process="process"></process>\n' +
    '\n' +
    '</svg>\n' +
    '\n' +
    '');
}]);
})();

angular.module('bpmn', ['bpmn.templates']).
directive('bpmn', function() {
    return {
        restrict: 'E',
        scope: {
            "definitions": "=",
            w: "=",
            h: "="
        },
        transclude: true,
        replace: true,
        templateUrl: 'js/bpmn.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'bpmn',
        bindToController: true,
        controller: function($scope) {
        }
    };
});


(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/event.directive.html',
    '<g ng:attr:transform="translate({{event.bounds.x}},{{event.bounds.y}})" >\n' +
    '    <circle x="0" y="0"\n' +
    '        ng:attr:cx="{{event.bounds.width / 2}}" ng:attr:cy="{{event.bounds.height / 2}}"\n' +
    '        ng:attr:r="{{event.bounds.width / 2}}"\n' +
    '        class="event event-{{event.type}}"\n' +
    '    ></circle>\n' +
    '    <text ng:attr:transform="translate({{event.label.x}},{{event.label.y}}) translate(0,15)">{{event.event.$.name}}</text>\n' +
    '</g>\n' +
    '');
}]);
})();

angular.module('bpmn').
directive('endEvent', function() {
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
            this.type = 'end';
            // Label
            if(this.event.di.BPMNLabel) {
                this.label = this.event.di.BPMNLabel[0].Bounds[0].$;
                this.label.x -= this.bounds.x;
                this.label.y -= this.bounds.y;
            }
        }
    };
});

angular.module('bpmn').
directive('exclusiveGateway', function() {
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
            this.type = 'exclusive';
            // Label
            if(this.gateway.di.BPMNLabel) {
                this.label = this.gateway.di.BPMNLabel[0].Bounds[0].$;
                this.label.x -= this.bounds.x;
                this.label.y -= this.bounds.y;
            }
        }
    };
});

(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/gateway.directive.html',
    '<g ng:attr:transform="translate({{gateway.bounds.x}},{{gateway.bounds.y}})" >\n' +
    '    <polygon x="0" y="0"\n' +
    '        ng:attr:points="\n' +
    '           {{gateway.bounds.width / 2}},0\n' +
    '           {{gateway.bounds.width}},{{gateway.bounds.height / 2}}\n' +
    '           {{gateway.bounds.width / 2}},{{gateway.bounds.height}}\n' +
    '           0,{{gateway.bounds.height / 2}}\n' +
    '           "\n' +
    '        class="gateway"\n' +
    '        ng-class="gateway.type"\n' +
    '    ></polygon>\n' +
    '    <use ng:attr:xlink:href="{{\'#simbol-\'+gateway.type}}" x="10" y="10"/>\n' +
    '    <text ng:attr:transform="translate({{gateway.label.x}},{{gateway.label.y}}) translate(0,15)">{{gateway.gateway.$.name}}</text>\n' +
    '</g>\n' +
    '');
}]);
})();

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

(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/lane.directive.html',
    '<g ng:attr:transform="translate({{lane.bounds.x}},{{lane.bounds.y}})" >\n' +
    '    <rect x="0" y="0"\n' +
    '        ng:attr:width="{{lane.bounds.width}}" ng:attr:height="{{lane.bounds.height}}"\n' +
    '        class="lane"\n' +
    '    ></rect>\n' +
    '    <text class="lane-label" ng:attr:transform="rotate(-90) translate({{lane.label.x}},{{lane.label.y}})">{{lane.lane.$.name}}</text>\n' +
    '</g>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/participant.directive.html',
    '<g ng:attr:transform="translate({{participant.bounds.x}},{{participant.bounds.y}})" >\n' +
    '    <rect x="0" y="0"\n' +
    '        ng:attr:width="{{participant.bounds.width}}" ng:attr:height="{{participant.bounds.height}}"\n' +
    '        class="participant"\n' +
    '    ></rect>\n' +
    '    <text class="participant-label" ng:attr:transform="rotate(-90) translate({{participant.label.x}},{{participant.label.y}})">\n' +
    '        {{participant.participant.$.name}}\n' +
    '    </text>\n' +
    '</g>\n' +
    '');
}]);
})();

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

(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/process.directive.html',
    '<g>\n' +
    '   <lane ng-repeat="lane in process.process.laneSet[0].lane" lane="lane"></lane>\n' +
    '   <task ng-repeat="task in process.process.task" task="task"></task>\n' +
    '   <user-task ng-repeat="task in process.process.userTask" task="task"></user-task>\n' +
    '   <script-task ng-repeat="task in process.process.scriptTask" task="task"></script-task>\n' +
    '   <service-task ng-repeat="task in process.process.serviceTask" task="task"></service-task>\n' +
    '   <send-task ng-repeat="task in process.process.sendTask" task="task"></send-task>\n' +
    '   <receive-task ng-repeat="task in process.process.receiveTask" task="task"></receive-task>\n' +
    '   <start-event ng-repeat="event in process.process.startEvent" event="event"></start-event>\n' +
    '   <end-event ng-repeat="event in process.process.endEvent" event="event"></end-event>\n' +
    '   <parallel-gateway ng-repeat="gateway in process.process.parallelGateway" gateway="gateway"></parallel-gateway>\n' +
    '   <exclusive-gateway ng-repeat="gateway in process.process.exclusiveGateway" gateway="gateway"></exclusive-gateway>\n' +
    '   <sequence-flow ng-repeat="sequenceFlow in process.process.sequenceFlow" sf="sequenceFlow"></sequence-flow>\n' +
    '</g>\n' +
    '');
}]);
})();

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

angular.module('bpmn').
directive('process', function() {
    return {
        restrict: 'E',
        scope: {
            "process": "=",
            w: "=",
            h: "="
        },
        replace: true,
        templateUrl: 'js/process.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'process',
        bindToController: true,
        controller: function($scope) {
        }
    };
});


(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/sequence-flow.directive.html',
    '<g>\n' +
    '    <path x="0" y="0"\n' +
    '        ng:attr:d="{{sf.wps}}"\n' +
    '        class="sequence-flow"\n' +
    '    ></path>\n' +
    '    <text ng:attr:transform="translate({{sf.label.x}},{{sf.label.y}}) translate(0,15)">{{sf.sf.$.name}}</text>\n' +
    '</g>\n' +
    '');
}]);
})();

angular.module('bpmn').
directive('receiveTask', function() {
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
            this.type = 'receive';
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

(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/svg-defs.directive.html',
    '<defs>\n' +
    '    <marker id="marker-arrow" class="marker-arrow" viewBox="0 -3 10 6" markerWidth="10" markerHeight="6" refx="10" refy="0" orient="auto">\n' +
    '        <path d="M10,0 L0,3 L0,-3 Z"/>\n' +
    '    </marker>\n' +
    '\n' +
    '    <g id="simbol-parallel" class="simbol-parallel">\n' +
    '        <line x1="0" y1="15" x2="30" y2="15"></line>\n' +
    '        <line x1="15" y1="0" x2="15" y2="30"></line>\n' +
    '    </g>\n' +
    '\n' +
    '    <g id="simbol-exclusive" class="simbol-exclusive">\n' +
    '        <line x1="5" y1="5" x2="25" y2="25"></line>\n' +
    '        <line x1="25" y1="5" x2="5" y2="25"></line>\n' +
    '    </g>\n' +
    '</defs>\n' +
    '');
}]);
})();

angular.module('bpmn').
factory('RounderService', function() {

    return roundPathCorners;

    /*****************************************************************************
    *                                                                            *
    *  SVG Path Rounding Function                                                *
    *  Copyright (C) 2014 Yona Appletree                                         *
    *                                                                            *
    *  Licensed under the Apache License, Version 2.0 (the "License");           *
    *  you may not use this file except in compliance with the License.          *
    *  You may obtain a copy of the License at                                   *
    *                                                                            *
    *      http://www.apache.org/licenses/LICENSE-2.0                            *
    *                                                                            *
    *  Unless required by applicable law or agreed to in writing, software       *
    *  distributed under the License is distributed on an "AS IS" BASIS,         *
    *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
    *  See the License for the specific language governing permissions and       *
    *  limitations under the License.                                            *
    *                                                                            *
    *****************************************************************************/

    /**
     * SVG Path rounding function. Takes an input path string and outputs a path
     * string where all line-line corners have been rounded. Only supports absolute
     * commands at the moment.
     *
     * @param pathString The SVG input path
     * @param radius The amount to round the corners, either a value in the SVG
     *               coordinate space, or, if useFractionalRadius is true, a value
     *               from 0 to 1.
     * @param useFractionalRadius If true, the curve radius is expressed as a
     *               fraction of the distance between the point being curved and
     *               the previous and next points.
     * @returns A new SVG path string with the rounding
     */
    function roundPathCorners(pathString, radius, useFractionalRadius) {
      function moveTowardsLength(movingPoint, targetPoint, amount) {
        var width = (targetPoint.x - movingPoint.x);
        var height = (targetPoint.y - movingPoint.y);

        var distance = Math.sqrt(width*width + height*height);

        return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
      }
      function moveTowardsFractional(movingPoint, targetPoint, fraction) {
        return {
          x: movingPoint.x + (targetPoint.x - movingPoint.x)*fraction,
          y: movingPoint.y + (targetPoint.y - movingPoint.y)*fraction
        };
      }

      // Adjusts the ending position of a command
      function adjustCommand(cmd, newPoint) {
        if (cmd.length > 2) {
          cmd[cmd.length - 2] = newPoint.x;
          cmd[cmd.length - 1] = newPoint.y;
        }
      }

      // Gives an {x, y} object for a command's ending position
      function pointForCommand(cmd) {
        return {
          x: parseFloat(cmd[cmd.length - 2]),
          y: parseFloat(cmd[cmd.length - 1]),
        };
      }

      // Split apart the path, handing concatonated letters and numbers
      var pathParts = pathString
        .split(/[,\s]/)
        .reduce(function(parts, part){
          var match = part.match("([a-zA-Z])(.+)");
          if (match) {
            parts.push(match[1]);
            parts.push(match[2]);
          } else {
            parts.push(part);
          }

          return parts;
        }, []);

      // Group the commands with their arguments for easier handling
      var commands = pathParts.reduce(function(commands, part) {
        if (parseFloat(part) == part && commands.length) {
          commands[commands.length - 1].push(part);
        } else {
          commands.push([part]);
        }

        return commands;
      }, []);

      // The resulting commands, also grouped
      var resultCommands = [];

      if (commands.length > 1) {
        var startPoint = pointForCommand(commands[0]);

        // Handle the close path case with a "virtual" closing line
        var virtualCloseLine = null;
        if (commands[commands.length - 1][0] == "Z" && commands[0].length > 2) {
          virtualCloseLine = ["L", startPoint.x, startPoint.y];
          commands[commands.length - 1] = virtualCloseLine;
        }

        // We always use the first command (but it may be mutated)
        resultCommands.push(commands[0]);

        for (var cmdIndex=1; cmdIndex < commands.length; cmdIndex++) {
          var prevCmd = resultCommands[resultCommands.length - 1];

          var curCmd = commands[cmdIndex];

          // Handle closing case
          var nextCmd = (curCmd == virtualCloseLine) ? commands[1] : commands[cmdIndex + 1];

          // Nasty logic to decide if this path is a candidite.
          if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] == "L" && nextCmd.length > 2 && nextCmd[0] == "L") {
            // Calc the points we're dealing with
            var prevPoint = pointForCommand(prevCmd);
            var curPoint = pointForCommand(curCmd);
            var nextPoint = pointForCommand(nextCmd);

            // The start and end of the cuve are just our point moved towards the previous and next points, respectivly
            var curveStart, curveEnd;

            if (useFractionalRadius) {
              curveStart = moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, radius);
              curveEnd = moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, radius);
            } else {
              curveStart = moveTowardsLength(curPoint, prevPoint, radius);
              curveEnd = moveTowardsLength(curPoint, nextPoint, radius);
            }

            // Adjust the current command and add it
            adjustCommand(curCmd, curveStart);
            curCmd.origPoint = curPoint;
            resultCommands.push(curCmd);

            // The curve control points are halfway between the start/end of the curve and
            // the original point
            var startControl = moveTowardsFractional(curveStart, curPoint, 0.5);
            var endControl = moveTowardsFractional(curPoint, curveEnd, 0.5);

            // Create the curve
            var curveCmd = ["C", startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];
            // Save the original point for fractional calculations
            curveCmd.origPoint = curPoint;
            resultCommands.push(curveCmd);
          } else {
            // Pass through commands that don't qualify
            resultCommands.push(curCmd);
          }
        }

        // Fix up the starting point and restore the close path if the path was orignally closed
        if (virtualCloseLine) {
          var newStartPoint = pointForCommand(resultCommands[resultCommands.length-1]);
          resultCommands.push(["Z"]);
          adjustCommand(resultCommands[0], newStartPoint);
        }
      } else {
        resultCommands = commands;
      }

      return resultCommands.reduce(function(str, c){ return str + c.join(" ") + " "; }, "");
    }
});

(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/svg-symbols.directive.html',
    '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n' +
    '    <symbol id="script-task" viewBox="0 0 48 48">\n' +
    '      <title>script-task icon</title>\n' +
    '      <path d="M32.113 6.503H13.75s2.59 5.663 2.59 10.112c0 4.45-2.67 5.177-2.67 10.758 0 5.58 1.86 5.662 1.86 5.662h16.826s-2.265-1.213-2.265-5.58c0-4.37 3.156-5.906 3.156-10.76 0-4.853-1.133-10.192-1.133-10.192z" stroke="#000" fill="none"/><path d="M18.94 10.207h10.64" stroke="#000" fill="none"/><path d="M19.514 13.83h10.642" stroke="#000" fill="none"/><path d="M19.44 17.54h10.644" stroke="#000" fill="none"/><path d="M18.645 21.1h10.643" stroke="#000" fill="none"/>\n' +
    '    </symbol>\n' +
    '    <symbol id="service-task" viewBox="0 0 48 48">\n' +
    '      <title>service-task icon</title>\n' +
    '      <path stroke-linejoin="round" stroke="#000" stroke-linecap="round" d="M25.673 24.58c-1.884 1.36-1.314-1.094-3.504-.32-2.19.77-.208 2.324-2.527 2.448-2.32.124-.513-1.63-2.774-2.165-2.26-.534-1.432 1.844-3.45.695s.45-1.65-1.162-3.32c-1.613-1.673-2.202.776-3.278-1.282s1.27-1.145.818-3.422c-.453-2.278-2.272-.536-2.065-2.85.207-2.312 1.687-.275 2.538-2.436s-1.62-1.68-.196-3.514 1.57.68 3.453-.678c1.883-1.358-.457-2.29 1.733-3.06 2.19-.774.953 1.42 3.272 1.295 2.32-.123.853-2.172 3.113-1.638 2.26.534.033 1.71 2.052 2.86s1.892-1.367 3.505.305-.897 1.456.18 3.514 2.33-.125 2.784 2.153c.453 2.277-1.542.74-1.75 3.053-.206 2.313 2.03 1.154 1.18 3.315s-1.697-.21-3.122 1.625 1.083 2.068-.8 3.426z" fill="none"/><path stroke-linejoin="round" d="M26.8 15.44a6.262 6.262 0 1 1-12.523 0 6.262 6.262 0 1 1 12.523 0z" transform="translate(-1.565 -.125)" stroke="#000" stroke-linecap="round" fill="none"/>\n' +
    '    </symbol>\n' +
    '    <symbol id="user-task" viewBox="0 0 48 48">\n' +
    '      <title>user-task icon</title>\n' +
    '      <g stroke="#000" fill="none"><path d="M27.78 18.062c-1.06 1.278-2.498 2.094-4.124 2.094-1.46 0-2.818-.662-3.844-1.718-7.11 4.032-8.75 17.124-8.75 17.124s5.496 2.853 11.782 2.782C29.13 38.272 34.5 35.78 34.5 35.78s.45-14.19-6.688-17.718c-.003.005-.027-.004-.03 0z"/><path d="M14.643 36.93c2.57-8.93 2.5-10.572 2.5-10.572"/><path d="M31.822 36.786c-2.57-8.93-2.5-10.57-2.5-10.57"/><path d="M31.07 15.643a5.857 7 0 1 1-11.713 0 5.857 7 0 1 1 11.714 0z" transform="translate(-1.643 -4)"/></g>\n' +
    '    </symbol></svg>');
}]);
})();

angular.module('bpmn').
directive('scriptTask', function() {
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
            this.type = 'script';
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

(function(module) {
try {
  module = angular.module('bpmn.templates');
} catch (e) {
  module = angular.module('bpmn.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('js/task.directive.html',
    '<g ng:attr:transform="translate({{task.bounds.x}},{{task.bounds.y}})" >\n' +
    '    <rect x="0" y="0"\n' +
    '        ng:attr:width="{{task.bounds.width}}" ng:attr:height="{{task.bounds.height}}"\n' +
    '        rx="8" ry="8"\n' +
    '        class="task"\n' +
    '    ></rect>\n' +
    '    <text ng:attr:transform="translate({{task.label.x}},{{task.label.y}})">{{task.task.$.name}}</text>\n' +
    '    <!--<image x="20" y="20" width="20" height="20" xlink:href="/svg/user.svg" />-->\n' +
    '    <!--<use xlink:href="#simbol-user" x="5" y="5" />-->\n' +
    '    <use ng:attr:xlink:href="{{task.symbol}}" xlink:href="" x="2" y="2" width="32" height="32" />\n' +
    '</g>\n' +
    '');
}]);
})();

angular.module('bpmn').
directive('sendTask', function() {
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
            this.type = 'send';
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

angular.module('bpmn').
directive('svgDefs', function() {
    return {
        restrict: 'E',
        scope: {
        },
        replace: true,
        templateUrl: 'js/svg-defs.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'defs',
        bindToController: true,
        controller: function() {
        }
    };
});


angular.module('bpmn').
directive('svgSymbols', function() {
    return {
        restrict: 'E',
        scope: {
        },
        replace: true,
        templateUrl: 'js/svg-symbols.directive.html',
        templateNamespace: 'svg',
        controllerAs: 'symbols',
        bindToController: true,
        controller: function() {
        }
    };
});


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

angular.module('bpmn').
directive('userTask', function() {
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
            this.type = 'user';
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

//# sourceMappingURL=maps/angular-bpmn.js.map