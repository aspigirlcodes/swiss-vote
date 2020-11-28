import React, {useContext} from "react"
import ResultContext from "../context"

function ResultsTable(){
    const {selectedVote1, selectedCanton} = useContext(ResultContext);
    const {description, results} = selectedVote1
    return(
        <table>
            <caption>{description && description.en}</caption>
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
            {results && results.map(result => (
                <tr className={selectedCanton && result.canton === selectedCanton.canton ? "selected" : ""} key={result.canton}>
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
