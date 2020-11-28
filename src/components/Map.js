import React, {useContext} from "react";
import { drawSvg } from "../helpers"
import ResultContext from "../context"


function Map(props) {
    const {selectedVote1, setSelectedCanton} = useContext(ResultContext);
    const {description, results} = selectedVote1
    return (
        <div className="dashboard-component">
            
            <h2>Map</h2>
            
        
            <svg height={538} width={840}>
                {drawSvg(results, (result) => result && setSelectedCanton(result))}
                {React.cloneElement(props.children, { description, results })}
            </svg>
            
            <p className="align-right"> Click a canton to see its results</p>
        </div>
        
    );
}


export default Map;
