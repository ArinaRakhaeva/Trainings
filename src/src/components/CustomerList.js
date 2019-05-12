import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import AddCustomer from "./AddCustomer";
import AddTrainings from "./AddTraining";
import EditCustomer from "./EditCustomer";
import Snackbar from '@material-ui/core/Snackbar';
import SeeTraining from './SeeTraining';
import DialogActions from '@material-ui/core/DialogActions';

class CustomerList extends Component {
    // con
    constructor(props){
        super(props);
        this.state = {
            customers : [], 
            message : '', 
            open : false,
            isTrainingOpen : false,
            currentCustomer : null,
        };
    }
    // Fetch cars
    componentDidMount() {
        this.loadCustomers();
    }
    //CUSTOMERS
    deleteCustomers = (customersLink) => {
        console.log(customersLink)
        if (window.confirm("Are you sure?")) {
            fetch(customersLink.original.links[0].href, {method: 'DELETE'})
            .then(this.loadCustomers())
            .then(res => this.setState ({open: true, message: 'Customer was deleted'}))
            .catch(err => console.error(err))
        }
    }
    loadCustomers = ()=>{
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(responce => responce.json())
        .then(jsondata => this.setState({customers: jsondata.content}))
        .catch(err => console.error(err))
        setTimeout(() => {
            this.setState({isTrainingOpen : !this.state.isTrainingOpen})
            this.setState({isTrainingOpen : !this.state.isTrainingOpen})
            this.render()
        }, 1000)
    }
    updateCustomers = (link, updatedCustomers) =>{
        fetch (link,
        {
            method : 'PUT',
            headers : 
            {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updatedCustomers)
        })
        .then(res => this.loadCustomers())
        .then(res => this.setState ({open: true, message: 'Change saved'}))
        .catch(err => console.error(err));
    }

    saveCustomers = (customers) => {
        fetch ('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customers)
        })
        .then(res => console.log(res))
        .then(res => this.loadCustomers())
        .then(res => this.setState ({open: true, message: 'New customer added'}))
        .catch(err => console.error(err));
    };

//TRAININGS
    loadTrainings = (customerTrainingsLink) => {
        this.setState(
            { 
                currentCustomer : customerTrainingsLink.value,
                isTrainingOpen : true
            })
    }

    // updateTrainingss = (updatedTrainings) =>{
    //     fetch ('https://customerrest.herokuapp.com/api/trainings',
    //     {method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'},
    //         body: JSON.stringify(updatedTrainings)
    //     })
    //     .then(res => this.loadTrainings())
    //     .then(res => this.setState ({open: true, message: 'Change saved'}))
    //     .catch(err => console.error(err));
    //         }
 
    deleteTraining = (training) => {
        console.log(training.value)
        fetch(training.value, { method: 'DELETE' })
            .then(responce => console.log(responce))
            .catch(err => console.error(err))
        setTimeout(() => {
            this.setState({isTrainingOpen : !this.state.isTrainingOpen})
            this.setState({isTrainingOpen : !this.state.isTrainingOpen})
            this.render()
        }, 1000)
    }

    saveTraining = (training) => {
        console.log(training)
        fetch ('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(training)
            })
            .then(responce => console.log(responce))
            .catch(err => console.error(err));
        setTimeout(() => {
            this.setState({isTrainingOpen : !this.state.isTrainingOpen})
            this.setState({isTrainingOpen : !this.state.isTrainingOpen})
            this.render()
        }, 1000)
    };

    handleClose = () => {
        this.setState({open: false})
    }

    closeTrainings = () => {
        this.setState( { isTrainingOpen : false } )
    }

    renderCustomers() {
        const columns = [
            {
                Header: 'Firstname',
                accessor: 'firstname'
            },
            {
                 Header: 'Lastname',
                 accessor: 'lastname'
            },
            {
                Header: 'Street address',
                accessor: 'streetaddress'
            },
            {
                Header: 'Postcode',
                accessor: 'postcode'
            },
            {
                Header: 'City',
                accessor: 'city'
            },
            {
                Header: 'E-mail',
                accessor: 'email'
            },
            {
                Header: 'Phone',
                accessor: 'phone'
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                accessor: 'links[0].href',
                Cell: ({value, row}) => <EditCustomer updateCustomers={this.updateCustomers} link={value} customers={row}/>
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                accessor: 'links[0].href',
                Cell: value => <Button color="primary" onClick={() => this.loadTrainings(value)}>See training</Button>
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                accessor: 'links[0].href',
                Cell: value => <Button color="secondary" onClick={() => this.deleteCustomers(value)}>DELETE</Button>
            },
            
        ]

        return (
            <div>
                <AddCustomer saveCustomers={this.saveCustomers}/>
                <ReactTable filterable={true} data={this.state.customers} columns={columns}/>
            </div>
        )
    }

    renderTrainings() {
        return (
            <div>
                <DialogActions>
                    <Button onClick={ this.closeTrainings} color="secondary">Cancel</Button>
                </DialogActions>
                <AddTrainings saveTraining={this.saveTraining} 
                            custromer={this.state.currentCustomer}/>
                <SeeTraining deleteTraining={this.deleteTraining} custromerTrainings={this.state.currentCustomer + '/trainings'}/> 
            </div>

        )
    }

    render() {
        console.log(this.state.customers)
        return (
            <div>
                { this.state.isTrainingOpen 
                    ? this.renderTrainings()
                    : this.renderCustomers() }

                
                <Snackbar
                    anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={this.state.message}
                />
            </div>
        );
    }
}

export default CustomerList;