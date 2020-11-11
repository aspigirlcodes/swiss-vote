import React from "react";
import { mount } from "enzyme";

import TotalResultsBar from "./TotalResultsBar";
import { mockResult } from "../testUtils"

describe("TotalResultsBar", () => {
  it("renders content from its props", () => {
    const resultsBarComponent = mount(<TotalResultsBar {...mockResult} width={100} height={50} margin={5} />);
    expect(
      resultsBarComponent.contains(<h2>Total Results</h2>)
    ).toEqual(true);
  });
});
