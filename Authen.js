import React, {Component} from 'react';
var firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyB5axBSbMLFVAJRGmxitamADIE9RA-bClU",
  authDomain: "usurvey-e3978.firebaseapp.com",
  databaseURL: "https://usurvey-e3978-default-rtdb.firebaseio.com",
  projectId: "usurvey-e3978",
  storageBucket: "usurvey-e3978.appspot.com",
  messagingSenderId: "38368855409",
  appId: "1:38368855409:web:00c4ead6defd53200562d0"
};


class Authen extends Component {

  login(event){
   const email = this.refs.email.value;
   const password = this.refs.password.value;
   console.log(email, password);

   const auth = firebase.auth();

   const promise = auth.signInWithEmailAndPassword(email, password);

  promise.then(user => {
    var lout = document.getElementById('logout');

    //write a welcome message for user
    lout.classList.remove('hide');
  });

   promise.catch(e => {
     var err = e.message;
     console.log(err);
     this.setState({err: err});
   });
  }

    signup(){
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      console.log(email, password);

      const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

   promise
   .then(user =>{
     var err = "welcome" + user.email;
     firebase.database().ref('users/'+user.uid).set({
       email: user.email
     });
     console.log(user);
     this.setState({err: err});
   });

   promise
   .catch(e =>{
     var err = e.message;
     console.log(err);
     this.setState(({err: err}));
   });
    }

    logout(){
      firebase.auth().signOut();
      var lout = document.getElementById('logout');

      //write a welcome message for user
      lout.classList.add('hide');
    }

    google(){
      console.log("I am in google method");

      var provider = new firebase.auth.GoogleAuthProvider();
      var promise = firebase.auth().signInWithPopup(provider);

      promise.then( result => {
        var user = result.user;
        console.log(result);
        firebase.database().ref('user/'+user.uid).set({
          email: user.email,
          name: user.displayName
        });

      });
      promise.catch(e => {
        var msg = e.message;
        console.log(msg);
      });
    }

  constructor(props){
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }

  render(){
    return(
      <div>
       <input id="email" ref="email" type="email" placeholder="Enter your email" /><br />
       <input id="pass" ref="password" type="password" placeholder="Enter your password" /><br />
       <p>{this.state.err}</p>
       <button onClick={this.login}>Log In</button>
       <button onClick={this.signup}>Sign Up</button>
       <button onClick={this.logout} id="logout" className="hide">Log Out</button>
       <button onClick={this.google} id="logout" className="">Sign in with Google</button>
      </div>
    );
  }
}


export default Authen;
