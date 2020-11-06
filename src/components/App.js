import React from "react";
import Selector from "./Selector";
import Map from "./Map";
import ToggleTableView from "./ToggleTableView"
import TotalResultBar from "./TotalResultsBar"
import ResultsTable from "./ResultsTable"
import CantonPie from "./CantonPie"


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
  state = {
    results : [],
    selectedVote: null
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

  render(){
    const selectedResult = this.state.results[this.state.selectedVote]
    return (
      <div>
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
      </div>
    );
  }
  
}

export default App;
