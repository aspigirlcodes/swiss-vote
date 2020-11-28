import React from "react";
import Selector from "./Selector";
import Map from "./Map";
import ToggleTableView from "./ToggleTableView"
import TotalResultBar from "./TotalResultsBar"
import ResultsTable from "./ResultsTable"
import CantonPie from "./CantonPie"
import ResultContext from "../context"


function Dashboard(props){
  const { description, results } = props
  return (
    <div id="dashboard">
      {props.children.map( child => React.cloneElement(child, { description, results }))}
    </div>
  )
}


class App extends React.Component {
  handleChange = this.handleChange.bind(this)
  setCanton = this.setCanton.bind(this)
  state = {
    results : [],
    selectedVote: null,
    selectedCanton: null,
  };

  componentDidMount(){
    fetch("./swiss-vote-results-sample.json").then(
      function(response){ return response.json()}
    ).then(responseJson => this.setState({results: responseJson})).catch(
      error => console.error("FetchError: ", error))
  }

  handleChange(event){
    this.setState({ selectedVote: event.target.value });
  }

  setCanton (canton) {
    this.setState({selectedCanton:canton})
  }

  render(){
    const selectedResult = this.state.results[this.state.selectedVote]
    return (
      <ResultContext.Provider value={{selectedVote1: {... selectedResult}, selectedCanton: this.state.selectedCanton, setSelectedCanton: this.setCanton}}>

        <h1>Swiss vote Dashboard</h1>
        <div id="form">
          <Selector options={this.state.results} value={this.state.selectedVote} onChange={this.handleChange}/>
        </div>
        <Dashboard {... selectedResult}>
          <TotalResultBar width={800} height={60} margin={20}/> 
          <CantonPie size={300} margin={20}/> 
          <Map>
            <ResultsTable/>
          </Map>
          <ToggleTableView/>
        </Dashboard>
      </ResultContext.Provider>
    );
  }
  
}

export {App, ResultContext };
