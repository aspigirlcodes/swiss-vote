import React, {useContext} from "react";
import { drawSvg, shortenDescription } from "../helpers"
import ResultContext from "../context"


function Map(props) {
    const {selectedVote, setSelectedCanton} = useContext(ResultContext);
    const {description, results} = selectedVote[props.index]
    return (
        <div className="dashboard-component">
            
            <h2>Map ({shortenDescription(description)})</h2>
            
        
            <svg height={538} width={840}>
                {drawSvg(results, (result) => result && setSelectedCanton(result.canton))}
                {React.cloneElement(props.children, props)}
            </svg>
            
            <p className="align-right"> Click a canton to see its results</p>
        </div>
        
    );
}


export default Map;
