import React, { Component } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Calendar from './components/Calendar';

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      currentListName : '',
      currentList : null
    }

    if (window.location.pathname === '/customers') {
      this.state = {
        currentListName : 'CUSTOMER LIST',
        currentList : <CustomerList/>
      }
    } 
    else if (window.location.pathname === '/trainings') {
      this.state = {
        currentListName : 'TRAININGS LIST',
        currentList : <TrainingsList/>
      }
    }
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              { this.state.currentListName }
            </Typography>
          </Toolbar>
        </AppBar>
        { this.state.currentList }
      </div>
    );
  }
}

export default App;
