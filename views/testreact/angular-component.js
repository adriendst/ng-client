const angularComponent = {
    template: ` <h1>I'm the angular component</h1>
                <div>
                  value: {{$ctrl.value}}
                  <button ng-click="$ctrl.addOne()">Add one</button>
                </div>`,
                // Note addOne is not directly called,
                // but instead passed as parameter
    bindings: {
      value: '<',
      addOne: '<'
    }
    // controller: function($scope) {
    //   const $ctrl = $scope.$ctrl;
    //   $ctrl.value = 1;
    //   $ctrl.addOne = () => {
    //     $ctrl.value = $ctrl.value + 1;
    //     console.log('added one', $ctrl.value);
    //     $scope.$apply();
    //   }
      
    // }
  };
  
  export default angularComponent;