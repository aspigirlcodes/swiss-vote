import React from "react"

const ResultContext = React.createContext({selectedVote1: null, selectedVote2: null, selectedCanton: null, setSelectedCanton: () => {}});

export default ResultContext
