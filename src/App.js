import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import UserList from './UserList';
import AddUser from './AddUser';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentWillMount() {
    this.fetchUser();
  }
  fetchUser(){
    // Make a request for a user with a given ID 
    axios.get('/api/users')
      .then((response) => {
        this.setState({users: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="Add-user">
          <AddUser fetchUser={()=>this.fetchUser()}/>
        </div>
        <div className="clear" />
        <UserList users={this.state.users}/>
      </div>
    );
  }
}

export default App;
