import React from "react"


function Selector(props){
    return(
        <div>
            <label htmlFor="vote-selector">{props.label}:</label>
            <select value={props.value} onChange={props.onChange} name="vote-selector" id="vote-selector">
                <option value={null} selected={props.value===null}> ---</option>
                {props.options.map((option, i) => <option key={i} value={i} selected={props.value===i}>{option.description.en}</option>)}
            </select>
        </div>
        
    )
}


export default Selector;
