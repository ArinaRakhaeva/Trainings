import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class CustomerList extends Component {
    // con
    constructor(props){
        super(props);
        this.state={customers: [], message: '', open: false};
    }
    // Fetch cars
    componentDidMount() {
        this.loadCustomers();
        //this.loadTrainings();
    }
    loadCustomers = ()=>{
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(responce => responce.json())
        .then(jsondata => this.setState({customers: jsondata.content}))
        .catch(err => console.error(err))
    }
    // componentDidMount() {
    //     this.loadTrainings();
    // }
    // loadTrainings = ()=>{
    //     fetch('https://customerrest.herokuapp.com/api/trainings')
    //     .then(responce => responce.json())
    //     .then(jsondata => this.setState({customers: jsondata.content}))
    //     .catch(err => console.error(err))
    // }

    render() {
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
        ]
                // const rows = this.state.customers.map((item, i)=> <tr key={i}><td>{item.firstname}</td><td>{item.lastname}</td></tr>)
        console.log(this.state.customers)
        return (
         <div>
             {/* <AddCar saveCar={this.saveCar}/> */}
             <ReactTable filterable={true} data={this.state.customers} columns={columns}/>
           {/* <table>
               <tbody>
                   {rows}
               </tbody>
           </table> */}
 {/* <Snackbar
     anchorOrigin={{
     vertical: 'bottom',
     horizontal: 'left',
 }}
     open={this.state.open}
     autoHideDuration={3000}
     onClose={this.handleClose}
     message={this.state.message}
     /> */}
         </div>
     );
 }
}

export default CustomerList;