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
                <Link to={"/edit/"+props.concert.id}>Módosítás</Link> | <button className="btn btn-danger" onClick={() => { props.deleteConcert(props.concert.id) }}>Törlés</button>
            </td>
        </tr>
    )
}

export default class ConcertList extends Component{
    constructor(props){
        super(props);

        this.deleteConcert = this.deleteConcert.bind(this);

        this.state = {
            concerts: [],
            zenekarok: [],
            szinpadok: [],
            idosavok: [],
            tomegek: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/')
        .then(response => {
            this.setState({concerts: response.data})
        })
        .catch((error)=>{
            console.log(error)
        })

        axios.get('http://localhost:5000/zenekarok/')
        .then(response =>{
            this.setState({zenekarok: response.data})
        })

        axios.get('http://localhost:5000/ido/')
        .then(response =>{
            this.setState({szinpadok: response.data})
        })

        axios.get('http://localhost:5000/szinpad/')
        .then(response =>{
            this.setState({idosavok: response.data})
        })

        axios.get('http://localhost:5000/tomeg/')
        .then(response =>{
            this.setState({tomegek: response.data})
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
            return <Concert
             concert={currentConcert} 
             zenekarok={this.state.zenekarok}
             deleteConcert={this.deleteConcert} 
             key={currentConcert.id}/>;
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