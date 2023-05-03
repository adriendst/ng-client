import angularModule from './angular-module';
import angular2reactWrapper from './angular2react-wrapper';


const angular2reactInstance = angular2reactWrapper(angularModule, document.getElementById('root'));

export default angular2reactInstance;