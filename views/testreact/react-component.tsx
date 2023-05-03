import React, {useState} from 'react';
import PropTypes from 'prop-types';
import angularComponent from './angular-component';
import angularModule from './angular-module';
import angular2reactInstance from './angular2react-instance';

const AngularComponent = angular2reactInstance(angularComponent, 'angularComponent');

const ReactComponent  = () => {
/*   constructor(props) {
    super(props);
    this.state = {value: 1};
  } */

  const [state, setState] = useState<number>(1);
  
  const onAdd = () => {
    setState(state +1)
  }

  return (
    <div id="react-component">
      <h1>I'm the react component</h1>
      <span>value: {state} </span>
      <button onClick={onAdd}>add one</button>
{/*       <AngularComponent value={state + 1} addOne={onAdd} /> */}

    </div>
  );
};

ReactComponent.propTypes = {
  value: PropTypes.number,
  addOne: PropTypes.func
}

export default ReactComponent;