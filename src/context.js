import React from "react"

const ResultContext = React.createContext({selectedVote: null, selectedVote2: null, selectedCanton: null, setSelectedCanton: () => {}});

export default ResultContext
