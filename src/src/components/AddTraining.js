import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Moment from "react-moment";
import 'moment-timezone';


class AddTrainings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open : false, 
          date : "", 
          duration : "", 
          activity : "",
          customer : props.custromer,
        }
        // Defines if the diolog is open/hidden
    };

    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }
    addTraining = () =>{
      const newTraining = {
        date : new Date(this.state.date),
        duration : this.state.duration,
        activity : this.state.activity,
        customer : this.state.customer
      }
      console.log(this.props)
      console.log(newTraining)
      this.props.saveTraining(newTraining);
      this.handleClose();
    }
    
    render() {
        return (
            <div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
              <DialogTitle id="form-dialog-title">New Training</DialogTitle>
              <DialogContent>
              <TextField
                  onChange={this.handleChange}
                  value={this.state.date}
                  autoFocus
                  margin="dense"
                  name="date"
                  label="Date"       
                  fullWidth
                />
              <TextField
                onChange={this.handleChange}
                value={this.state.duration}
                margin="dense"
                name="duration"
                label="Duration"
                fullWidth
              />
              <TextField
                onChange={this.handleChange}
                value={this.state.activity}
                margin="dense"
                name="activity"
                label="Activity"
                fullWidth
              />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addTraining} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={this.handleClickOpen} color="primary"> 
        ADD TRAINING{""}
        </Button>   
            </div>
        );
    }
}

export default AddTrainings;