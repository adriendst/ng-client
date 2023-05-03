import { angular2react } from 'angular2react';

const angular2reactWrapper = (angularModule, rootElement) => {
  let $injector;

  angularModule.run(['$injector', function(_$injector_) {
    $injector = _$injector_;
  }]);

  angular.bootstrap(rootElement, [angularModule.name]);

  return (component, componentName) => angular2react(componentName, component, $injector);
}

export default angular2reactWrapper;