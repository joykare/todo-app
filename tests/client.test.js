import React from "react";
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from "../client/components/app.js";

describe("Tests for <App /> Component", () => {
  it("takes a snapshot of the app component", () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("initially has empty state", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state().todos).toEqual([]);
    expect(wrapper.state().title).toEqual("");
    expect(wrapper.state().description).toEqual("");
    expect(wrapper.state().date).toEqual("");
    expect(wrapper.find('.loading').length).toEqual(1);
  })

  it("when state is set it displays list of todos", () => {
    const wrapper = shallow(<App />);

    wrapper.setState({
      todos: [{
        title: "testy westy",
        description: "test 1 going on",
        date: new Date("1.01.1991")
      }]
     });

    expect(wrapper.find('.list-group').length).toBeGreaterThanOrEqual(1);
    expect(wrapper.find('.loading').length).toEqual(0);
  })
})