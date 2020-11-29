import React, { cloneElement } from "react";
import Selector from "./Selector";
import Map from "./Map";
import ToggleTableView from "./ToggleTableView"
import TotalResultBar from "./TotalResultsBar"
import ResultsTable from "./ResultsTable"
import CantonPie from "./CantonPie"
import ResultContext from "../context"
import CorrelationGraph from "./CorrelationGraph";


function Dashboard(props){
  const { description, results } = props
  return (
    <div id="dashboard">
      {props.children.map( (child, key) => (<div className="dashboard-row"> {[0,1].map(a => cloneElement(child, { index: a, key }))}</div>))}
    </div>
  )
}


class App extends React.Component {
  handleSelect = this.handleSelect.bind(this)
  handleCompare = this.handleCompare.bind(this)
  setCanton = this.setCanton.bind(this)
  state = {
    results : [],
    selectedVote: null,
    compareVote: null,
    selectedCanton: null,
  };

  componentDidMount(){
    fetch("./swiss-vote-results-sample.json").then(
      function(response){ return response.json()}
    ).then(responseJson => this.setState({results: responseJson})).catch(
      error => console.error("FetchError: ", error))
  }

  handleSelect(event){
    this.setState({ selectedVote: event.target.value });
  }

  handleCompare(event){
    this.setState({ compareVote: event.target.value });
  }

  setCanton (canton) {
    this.setState({selectedCanton:canton})
  }

  render(){
    const selectedResult = this.state.results[this.state.selectedVote]
    const compareResult = this.state.results[this.state.compareVote]
    return (
      <ResultContext.Provider value={{selectedVote: [{...selectedResult}, {...compareResult}], selectedCanton: this.state.selectedCanton, setSelectedCanton: this.setCanton}}>

        <h1>Swiss vote Dashboard</h1>
        <div id="form">
          <Selector label="Select a Vote to see the result" options={this.state.results} value={this.state.selectedVote} onChange={this.handleSelect}/>
          <Selector label="Select a Vote to compare" options={this.state.results} value={this.state.compareVote} onChange={this.handleCompare}/>
        </div>
        <Dashboard>
          <TotalResultBar width={800} height={60} margin={20}/> 
          <Map>
            <ResultsTable/>
          </Map>
          <CantonPie size={300} margin={20}/> 
          <ToggleTableView />
        </Dashboard>
        <CorrelationGraph/>
      </ResultContext.Provider>
    );
  }
  
}

export {App, ResultContext };
