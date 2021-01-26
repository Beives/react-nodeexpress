import React,{Component} from 'react';
import axios from 'axios';

export default class CreateConcert extends Component{

    constructor(props){
        super(props);

        this.onChangeIdo = this.onChangeIdo.bind(this);
        this.onChangeSzinpad = this.onChangeSzinpad.bind(this);
        this.onChangeTomeg = this.onChangeTomeg.bind(this);
        this.onChangeZenekar = this.onChangeZenekar.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            zenekar: 1,
            ido: 1,
            szinpad: 1,
            tomeg: 1,
            zenekarok: [],
            szinpadok: [],
            idosavok: [],
            tomegek: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/zenekarok/')
        .then(response =>{
            if (response.data.length > 0) {
                this.setState({
                    zenekarok: response.data
                })
            }
        })

        axios.get('http://localhost:5000/szinpad/')
        .then(response =>{
            if (response.data.length > 0) {
                this.setState({
                    szinpadok: response.data
                })
            }
        })

        axios.get('http://localhost:5000/tomeg/')
        .then(response =>{
            if (response.data.length > 0) {
                this.setState({
                    tomegek: response.data
                })
            }
        })

        axios.get('http://localhost:5000/ido/')
        .then(response =>{
            if (response.data.length > 0) {
                this.setState({
                    idosavok: response.data
                })
            }
        })
    }

    onChangeZenekar(e){
        this.setState({
            zenekar: e.target.value
        });
    }
    onChangeIdo(e){
        this.setState({
            ido: e.target.value
        });
    }
    onChangeSzinpad(e){
        this.setState({
            szinpad: e.target.value
        });
    }
    onChangeTomeg(e){
        this.setState({
            tomeg: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const koncert = {
            zenekar: this.state.zenekar,
            ido: this.state.ido,
            szinpad: this.state.szinpad,
            tomeg: this.state.tomeg
        }
        console.log(koncert);
        axios.post('http://localhost:5000/add', koncert)
        .then(res=>{
            console.log(res.data)
            if (res.data === "Felvétel sikerült") {
                window.location = '/';
            }
        });
    }

    render(){
        return(
            <div>
                <h3>Új koncert felvétele</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Zenekar: </label>
                        <select ref="zenekarInput" required className="form-control" value={this.state.zenekar} onChange={this.onChangeZenekar}>
                            {
                                this.state.zenekarok.map(function(zenekar) {
                                return <option 
                                    key={zenekar.id}
                                    value={zenekar.id}>{zenekar.nev}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group"> 
                        <label>Idősáv:: </label>
                        <select ref="idoInput" required className="form-control" value={this.state.ido} onChange={this.onChangeIdo}>
                            {
                                this.state.idosavok.map(function(idosav) {
                                return <option 
                                    key={idosav.id}
                                    value={idosav.id}>{idosav.idosav}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group"> 
                        <label>Színpadok: </label>
                        <select ref="szinpadInput" required className="form-control" value={this.state.szinpad} onChange={this.onChangeSzinpad}>
                            {
                                this.state.szinpadok.map(function(szinpad) {
                                return <option 
                                    key={szinpad.id}
                                    value={szinpad.id}>{szinpad.megnevezes}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group"> 
                        <label>Férőhely: </label>
                        <select ref="tomegInput" required className="form-control" value={this.state.tomeg} onChange={this.onChangeTomeg}>
                            {
                                this.state.tomegek.map(function(tomeg) {
                                return <option 
                                    key={tomeg.id}
                                    value={tomeg.id}>{tomeg.kozonseg}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    
                    <div className="form-group">
                    <input type="submit" value="Koncert felvétele" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}