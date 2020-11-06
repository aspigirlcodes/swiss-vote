import React from "react"


function Selector(props){
    return(
        <select value={props.value} onChange={props.onChange} name="vote-selector">
            <option value={null} selected={props.value===null}> ---</option>
            {props.options.map((option, i) => <option key={i} value={i} selected={props.value===i}>{option.description.en}</option>)}
        </select>
    )
}


export default Selector;
