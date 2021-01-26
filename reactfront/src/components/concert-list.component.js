import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ConcertList extends Component{
    constructor(prosp){
        super(props);

        this.deleteConcert = this.deleteConcert.bind(this);

        this.state = {concerts: []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/')
        .then(response => {
            this.setState({concerts: response.data})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                lista
            </div>
        )
    }
}