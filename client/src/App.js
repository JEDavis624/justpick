import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Topnav from './containers/Topnav';
import CreateAccount from './containers/CreateAccount';
import Login from './containers/Login';
import SearchContainer from './containers/SearchContainer';
import ProDetail from './containers/ProDetail';
import ProProfile from './containers/ProProfile';
import ApptScheduler from './containers/ApptScheduler';
import WeeklyAvailability from './containers/WeeklyAvailability';
import WeeklySchedule from './containers/WeeklySchedule';

// import AboutUs from './containers/AboutUs';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: null,
      selectedPro: ''
    }

    this.setAuth = this.setAuth.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.selectPro = this.selectPro.bind(this);
  };

  setAuth = (isAuthenticated, user) => {
    this.setState({ authenticated: isAuthenticated, user });
    console.log(this.state);
  };

  updateUser = (user) => {
    this.setState({ user });
  };

  selectPro = (user) => {
    // console.log(user);
    this.setState({
      selectedPro: user
    });
  };

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Topnav  setAuth={this.setAuth} authenticated={this.state.authenticated} user={this.state.user} />
          <Switch>
            <Route exact path="/" render={props => <SearchContainer selectPro={this.selectPro} />} />
            <Route exact path="/createaccount" render={props => <CreateAccount setAuth={this.setAuth} />} />
            <Route path="/login" render={props => <Login setAuth={this.setAuth} />} />
            <Route exact path="/pro" render={props => <ProProfile user={this.state.user} updateUser={this.updateUser}/>} />
            <Route path="/prodetail" render={props => <ProDetail pro={this.state.selectedPro} /> } />
            {/* <Route exact path="/about" component={AboutUs} /> */}
            <Route path="/appt" render={props => <ApptScheduler pro={this.state.selectedPro} student={this.state.user} />} />
            <Route path="/avail" component={WeeklyAvailability} />
            <Route path="/schedule" render={props => <WeeklySchedule pro={this.state.selectedPro} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
