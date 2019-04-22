import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TrainingsList extends Component {
    // con
    constructor(props){
        super(props);
        this.state={trainings: [], message: '', open: false};
    }
    // Fetch cars
    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = ()=>{
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(responce => responce.json())
        .then(jsondata => this.setState({trainings: jsondata.content}))
        .catch(err => console.error(err))
    }
    render() {
        const columns =[ 
        {
            Header: 'Date',
            accessor: 'date'
        }, 
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        ]
        // const rows = this.state.customers.map((item, i)=> <tr key={i}><td>{item.firstname}</td><td>{item.lastname}</td></tr>)
     return (
         <div>
             {/* <AddCar saveCar={this.saveCar}/> */}
             <ReactTable filterable={true} data={this.state.trainings} columns={columns}/>
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

export default TrainingsList;