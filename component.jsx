import {Component} from 'react';

class RenderImage extends Component {

  render() {
    const imageUrl = this.props.imageUrl;
    return (
      <div>
        <img src={imageUrl} alt="" style={{height:'50px'}}/>
        <p>TEST COMPOSANT REACT</p>
      </div>
      );
  }
}


  