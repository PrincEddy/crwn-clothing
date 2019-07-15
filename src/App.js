import React from 'react';
import { Switch, Route} from 'react-router-dom';

import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sgin-up/sign-in-and-sgin-up.component'
import {auth ,createUserProfileDocument} from './firebase/firebase.utils';


import HomePage from './pages/homepage/homepage.component';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser:null
    }
  }

  unsubscribezfromAuth =null;



  componentDidMount(){
    this.unsubscribezfromAuth = auth.onAuthStateChanged( async userAuth => {
      
      //createUserProfileDocument(user);
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>{
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          });
        });
      }else {
        this.setState({currentUser:userAuth})
      }
      console.log(this.state);
    });
  }

  componentWillUnmount(){
    this.unsubscribezfromAuth();
  }
  render(){
    return (
      <div>
      <Header currentUser = {this.state.currentUser}/>
      <Switch>
       <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SignInAndSignUp}/>
      </Switch> 
      </div>
    );
  }
 
}

export default App;
