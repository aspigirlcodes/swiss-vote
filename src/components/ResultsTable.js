import React from "react"


function ResultsTable(props){
    return(
        <table>
            <caption>{props.description && props.description.en}</caption>
            <thead>
                <tr>
                    <td>Canton</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>Total</td>
                    <td>Yes (%)</td>
                    <td>No (%)</td>
                </tr>
            </thead>
            <tbody>
            {props.results && props.results.map(result => (
                <tr key={result.canton}>
                    <td>{result.canton}</td>
                    <td>{result.yes}</td>
                    <td>{result.no}</td>
                    <td>{result.yes + result.no}</td>
                    <td>{(result.yes/(result.yes + result.no)*100).toFixed(2)}</td>
                    <td>{(result.no / (result.yes + result.no) * 100).toFixed(2)}</td>
                </tr>))}
            </tbody>

        </table>
    )
}


export default ResultsTable;
