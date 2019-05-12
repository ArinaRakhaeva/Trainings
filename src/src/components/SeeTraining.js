import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from "react-moment";
import 'moment-timezone';
import DatePicker from 'react-date-picker';
import { Button } from '@material-ui/core';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

class SeeTraining extends Component {
    // con
    constructor(props) {
        console.log(props.custromerTrainings)
        super(props);
        
        this.state = {
            trainings : [], 
            message : '', 
            open : false,
            trainingsLink : props.custromerTrainings,
            isTableView : true,
            eventList : [],
        };
        console.log("HERE!!!")
        this.tuggleViewType = this.tuggleViewType.bind(this)
    }
    // Fetch cars
    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        console.log("GEGE!")
        fetch(this.state.trainingsLink)
        .then(responce => responce.json())
        .then(jsondata => {
                this.setState({trainings: jsondata.content})
                var myEventList = []
                var json = Object.values(jsondata.content)
                var startDate = null;
                var endDate = null
                for(var i = 0; i < json.length; ++i) {
                    if(json[i].date == null){
                        continue;
                    } 
                    try{
                        startDate = new Date(json[i].date)
                        endDate = new Date()
                        endDate.setUTCMinutes(startDate.getUTCMinutes() + json[i].duration)
                        myEventList.push({
                            title : json[i].activity,
                            start : startDate,
                            end : endDate,
                        })
                    }
                    catch(err){
                        console.error(err)
                    }
                }
                console.log(myEventList)
                this.setState({eventList : myEventList})    
            })
        .catch(err => console.error(err))
    }

    tuggleViewType() {
        this.setState({ isTableView : !this.state.isTableView })
    }

    deleteTraining = (value) => {
        console.log(this.props)
        this.props.deleteTraining(value)
    }

    render() {
        const localizer = BigCalendar.momentLocalizer(moment)
        const columns =[ 
        {
            Header: "Date",
            accessor: "date",
            Cell: row => {
                return <Moment format="DD.MM.YYYY HH.MM">{row.value}</Moment>;
            }
        }, 
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: '',
            filterable: false,
            sortable: false,
            accessor: 'links[0].href',
            Cell: value => <Button color="secondary" onClick={() => this.deleteTraining(value)}>DELETE</Button>
        },
        ]

        return (
         <div>
            <Button onClick={this.tuggleViewType}>Change View</Button> 
            { this.state.isTableView 
                ? <ReactTable filterable={true} data={this.state.trainings} columns={columns}/>
                : <div><BigCalendar
                    localizer={localizer}
                    events={this.state.eventList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, width: this.state.width }}
                    /></div>
                    }
         </div>
     );
 }
}

export default SeeTraining;