import React from "react";
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from "../client/components/app.js";

describe("Tests for <App /> Component", () => {
  it("takes a snapshot of the app component", () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})