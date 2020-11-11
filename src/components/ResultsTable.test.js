import React from "react";
import { mount } from "enzyme";

import ResultsTable from "./ResultsTable";
import { mockResult } from "../testUtils"

describe("ResultsTable", () => {
  it("renders content from its props", () => {
    const tableComponent = mount(<ResultsTable {...mockResult} />);
    expect(
      tableComponent.contains(<caption>{mockResult.description.en}</caption>)
    ).toEqual(true);
    const firstResult = mockResult.results[0]
    expect(
    tableComponent.contains(<tr key={firstResult.canton}><td>{firstResult.canton}</td><td>{firstResult.yes}</td><td>{firstResult.no}</td><td>{firstResult.yes + firstResult.no}</td><td>{(firstResult.yes/(firstResult.yes + firstResult.no)*100).toFixed(2)}</td><td>{(firstResult.no/(firstResult.yes + firstResult.no)*100).toFixed(2)}</td></tr>)
    ).toEqual(true);
  });
});
