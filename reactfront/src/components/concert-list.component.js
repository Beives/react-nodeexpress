import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Concert = props => {
    return(
        <tr>
        <td>{props.concert.zenekar}</td>
        <td>{props.concert.ido}</td>
        <td>{props.concert.szinpad}</td>
        <td>{props.concert.tomeg}</td>
        <td>
            <Link to={"/edit/"+props.concert.id}>Módosítás</Link> | <a href="#" onClick={() => { props.deleteConcert(props.concert.id) }}>Törlés</a>
        </td>
    </tr>
    )
}

export default class ConcertList extends Component{
    constructor(props){
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

    deleteConcert(id){
        axios.delete('http://localhost:5000/'+id)
        .then(res => console.log(res.data+" "+id));
        this.setState({
            concerts: this.state.concerts.filter(el=>el.id !== id)
        })
    }

    concertList(){
        return this.state.concerts.map(currentConcert => {
            return <Concert concert={currentConcert} deleteConcert={this.deleteConcert} key={currentConcert._id}/>;
          })
    }

    render() {
        return (
          <div>
            <h3>Koncertek</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Zenekar</th>
                  <th>Idősáv</th>
                  <th>Helyszín</th>
                  <th>Közönség méret</th>
                  <th>Kezelés</th>
                </tr>
              </thead>
              <tbody>
                { this.concertList() }
              </tbody>
            </table>
          </div>
        )
      }

}