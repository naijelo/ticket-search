import { shallow, render, mount } from "enzyme";
import React from 'react';
import TicketSearch from "./TicketSearch";
import {DatePickerActivateField} from "./TicketSearch.style.js";
import { DatePicker } from "../Calendar/Calendar.style.js";

let wrapper;
test('renders a div into TicketSearch', () => {
  let wrapper = shallow(<TicketSearch />);
  expect(wrapper.find('div'));
});

test("render of TicketSearch", () => {
  expect(wrapper).not.toBenull;
});

describe("inputs", () => {
  const props = {
    onInput: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(<TicketSearch {...props}/>)
  });

  test("correctly number of inputs", () => {
    expect(wrapper.find("input").length).toEqual(2);
  });

  test("correctly from-input behavior", () => {
    wrapper.find("input").at(0).simulate("change", { target: { value: "foo" }});
  });

  test("correctly to-input behavior", () => {
    wrapper.find("input").at(1).simulate("change", { target: { value: "foo" }});
  });



});

describe("calendar", () => {
  let wrapper;
  const props = {
    onClick: jest.fn()
  };
  beforeEach(() => {
      wrapper = mount(<TicketSearch {...props}/>)
    });

  test("render of calendar activate button", () => {
    expect(wrapper.find("DatePickerActivateField")).not.toBenull;
  });

  test("dont see dropdown before click", () => {
    expect(wrapper.find("DatePicker").length).toEqual(0);
  });

  test("DatePickerActivateField is defined", () => {
    expect(wrapper.find(<DatePickerActivateField/>)).toBeDefined();
  });

  test("div in DatePickerActivateField", () => {
    const DatePickerActivate = wrapper.find(DatePickerActivateField);
    expect(DatePickerActivate.find("div")).toBeDefined();
  });

  test("don't see dropdown before click", () => {
    const DatePickerActivate = wrapper.find(DatePickerActivateField);
    console.log(wrapper.debug());
    expect(DatePickerActivate.find("div")).toBeDefined();
  });
  
  test("see dropdown after click", () => {
    const DatePickerActivate = wrapper.find(DatePickerActivateField);
    DatePickerActivate.find("div").simulate("click");
    expect(wrapper.find(DatePicker)).toBeDefined();
  });

});
