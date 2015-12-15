# angular-bpmn

## Introduction
**angular-bpmn** is a set of AngularJS directives used to display BPMN diagrams in the browser, using SVG elements.

**WARNING**: this repo is a work in progress, laking important parts to be a functional system.

**angular-bpmn** is created with AngularJS, nodejs, expressjs, SVG, gulp, karma, jasmine, etc.

### What's BPMN?
Business Process Model and Notation (BPMN) is a standard for business process modeling that provides a graphical notation for specifying business processes in a Business Process Diagram.

The objective of BPMN is to support business process management, for both technical users and business users, by providing a notation that is intuitive to business users, yet able to represent complex process semantics.

## Rationale
Display BPMN diagrams inside an app backed by a process management system can be a valuable way of representing the state of a process and their history and its future. Sometimes it is useful for process debugging and for process simulation.
There are now multiple BPMN based engines, mainly big and with many tools, but the are also some other lighter engines wich can be used in more modular systems. One of them is https://github.com/e2ebridge/bpmn based on node.js and JavaScript.

angular-bmpn aims to be another tool useful to build apps backed by a process management engine, and help to develop, test, monitor, etc. all the parts of that apps.

## Example
To launch the example on your pc use:
```sh
git clone https://github.com/eemece2/angular-bpmn.git
cd angular-bpmn
node example/server.js
```
and browse to
http://localhost:8000

### Online Demo
TODO: View them online.

### Images (SVGs)
TODO: Show generated diagram examples as static SVGs

## Usage
### Manual usage
You can copy the */dist* folder content, and link the css and js files in your html. 
### Bower
TODO: publish bower package

## Develop
angular-bpmn uses gulp as their automation tool/task runner.
### Build
To build production code you should use the 'build' gulp task:
```sh
gulp build
```
Production code will be located on the */dist* folder.

### Test
angular-bpmn uses karma as his test runner, and jasmine as his testing framework.

To test angular-bpmn source code launch karma runner (with autowath files and continuous running) with:
 ```sh
 karma start
 ```

### Watch
You can use 'watch' gulp task to watch source code changes, so that production code is rebuild and the browser (the examples) is refreshed, thanks to livereload module:
```sh
gulp watch
```

### Continuous Integration
With Jenkins you can use the following build commands:
```sh
npm install
bower install
karma start karma.jenkins.conf.js
```
junit test reports will be created at folder *./test-reports*

Use the following XML path on jenkins job config option: *Post-build Action -> Publish JUnit test result report -> Test report XMLs*:

```
test-reports/**/test-results.xml
```

## License
MIT: https://www.github.com/eemece2/angular-bpmn/LICENSE

