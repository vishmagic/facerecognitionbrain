import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const particleConfig = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  computeFaceLoc = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImage');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onFeedSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log('Clicked');
      fetch('http://localhost:3000/imageurl',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(err => console.log(err))
      }
      this.displayFaceBox(this.computeFaceLoc(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route}); 
  }

  render() {
    const { isSignedIn, box, imageUrl, route } = this.state
    return (
      <div className="App">
        <Particles className = 'particles' params={particleConfig} />
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
        { this.state.route === 'home'
          ? 
          <div>
              <Logo />
              <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
              <ImageLinkForm
                onInputChange =  {this.onInputChange}
                onFeedSubmit = {this.onFeedSubmit}
              />        
              <FaceRecognition box = {box} imageUrl = {imageUrl}/>
            </div>
          : (route === 'signin'
            ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
            : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
