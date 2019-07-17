import React from 'react';
import { Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sgin-up/sign-in-and-sgin-up.component'
import {auth ,createUserProfileDocument} from './firebase/firebase.utils';
import  {setCurrentUSer} from './redux/user/user.actions'

import HomePage from './pages/homepage/homepage.component';
import { dispatch } from 'rxjs/internal/observable/range';
class App extends React.Component {

  

  unsubscribezfromAuth =null;



  componentDidMount(){

    const {setCurrentUSer} = this.props;
    this.unsubscribezfromAuth = auth.onAuthStateChanged( async userAuth => {
      
      //createUserProfileDocument(user);
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>{
          setCurrentUSer({
              id:snapshot.id,
              ...snapshot.data()
            });
          });
      }else {
        setCurrentUSer(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribezfromAuth();
  }
  render(){
    return (
      <div>
      <Header />
      <Switch>
       <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SignInAndSignUp}/>
      </Switch> 
      </div>
    );
  }
 
}

const mapDispatchToProps = dispatch => ({
  setCurrentUSer:user => dispatch(setCurrentUSer(user))
})

export default connect(null,mapDispatchToProps)(App);
