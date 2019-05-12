import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, firstname: "", lastname: "",streetadress: "",postcode: "", city: "", email: "", phone: ""}
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
    addCustomers = () =>{
        const newCustomer= {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetadress: this.state.streetadress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        }
        this.props.saveCustomers(newCustomer);
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
          <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
          <DialogContent>
          <TextField
              onChange={this.handleChange}
              value={this.state.firstname}
              autoFocus
              margin="dense"
              name="firstname"
              label="First name"              
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.lastname}
              margin="dense"
              name="lastname"
              label="Last name"
              fullWidth
            />
             <TextField
              onChange={this.handleChange}
              value={this.state.streetadress}
              margin="dense"
              name="streetadress"
              label="Street adress"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.postcode}
              margin="dense"
              name="postcode"
              label="Post code"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.city}
              margin="dense"
              name="city"
              label="City"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.email}
              margin="dense"
              name="email"
              label="E-mail"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.phone}
              margin="dense"
              name="phone"
              label="Phone"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addCustomers} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={this.handleClickOpen} color="primary"> 
        ADD CUSTOMER{""}
        </Button>   
            </div>
        );
    }
}

export default AddCustomer;