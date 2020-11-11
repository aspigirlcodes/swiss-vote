import React from "react";
import { mount } from "enzyme";

import App from "./App";
import { mockResult } from "../testUtils"

describe("DashBoard", () => {
  it("renders content from its props", () => {
    const dashboardComponent = mount(<App/>);
    expect(
      dashboardComponent.contains()).toEqual(True);
  });
});
