import React from "react";
import ResultsTable from "./ResultsTable"


class ToggleTableView extends React.Component {
    state = {
        isVisible: false,
    }
      
    
    render(){
        return (
        <div class="dashboard-component dashboard-table">
            <button onClick={()=>this.setState((prev) => ({isVisible: !prev.isVisible}))}>{this.state.isVisible? "Hide Table" : "Show Table"}</button>
            {this.state.isVisible && <ResultsTable {...this.props} />}
        </div>
        );
    }
  
}

export default ToggleTableView;
