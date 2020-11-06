import React from "react";
import Selector from "./Selector";
import Map from "./Map";
import ToggleTableView from "./ToggleTableView"
import TotalResultBar from "./TotalResultsBar"
import ResultsTable from "./ResultsTable"


function Dashboard(props){
  const { description, results } = props
  return (
    <div>
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
        <div id="form">
          <Selector options={this.state.results} value={this.state.selectedVote} onChange={this.handleChange}/>
        </div>
        <Dashboard {... selectedResult}>
          <TotalResultBar />  
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
