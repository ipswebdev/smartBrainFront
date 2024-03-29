import React,{ Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
 

 
const particleOptions={
  particles: {
    number:{
      value:500,
      density:{
        enable:true,
        value_area:1000
      }
    }
}
}
const initialState={

  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user:{
      id:'',
      name:'',
      email:'',
      password:'',
      entries:0,
      joined:'',
    }
}

class App extends Component{
  constructor(){
super();
this.state=initialState;
}
loadUser = (data) => {
  this.setState({
    user:
    { 
        id:data.id,
        name:data.name,
        email:data.email,
        password:data.password,
        entries:data.entries,
        joined:data.joined,
    }
    })
}
 
calculateFaceLocation = (data) =>{
const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box
const image=document.getElementById('inputImage');
const width=Number(image.width);
const height=Number(image.height);
return{
   leftCol: clarifaiFace.left_col* width,
   topRow:clarifaiFace.top_row * height,
   rightCol:width-(clarifaiFace.right_col*width),
   bottomRow:height-(clarifaiFace.bottom_row*height),
}
}
 
 
displayFaceBox = (box) => {
  console.log(box);
  this.setState({box :box});
}
 
onInputChange = (event) => {
  this.setState({input: event.target.value});
}

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
     fetch('https://powerful-brushlands-55300.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input,
            })
          })
     .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://powerful-brushlands-55300.herokuapp.com:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
              this.setState(Object.assign(this.state.user.entries,{entries:count}))
            })
          .catch(err => console.log(err));
 
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
     .catch(err => console.log(err));
  } 
onRouteChange=(route) =>{
  if(route === 'signout'){
this.setState(initialState);
}else if(route === 'ghar') {
  this.setState({ isSignedIn: true });
}
this.setState({route:route});
}
 
 
  render(){
    const { isSignedIn , imageUrl, route, box} = this.state;
  return (
    <div className="App">
     <Particles className="particles" 
              params={
                  particleOptions
                }
              />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
     {route ==='ghar' 
      ?
      <div>
      <Logo/>
      <Rank name={this.state.user.name}
      entries={this.state.user.entries}/> 
      <FaceRecognition 
      box={this.state.box}
      imageUrl={this.state.imageUrl}/>
      <ImageLinkForm 
      onInputChange={this.onInputChange}
      onButtonSubmit={this.onButtonSubmit}
      />
      </div>
      :(
        route ==='signin'
          ?  <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      }
      </div>
  );
}
}
export default App;