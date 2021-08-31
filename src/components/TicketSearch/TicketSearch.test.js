import React from 'react';
import { shallow, render, mount } from "enzyme";
import sinon from 'sinon';
import initStoryshots from '@storybook/addon-storyshots';

import TicketSearch from "./TicketSearch";
import { DatePickerActivateField } from "./TicketSearch.style.js";
import { DatePicker } from "../Calendar/Calendar.style.js";

import { StyledInput } from '../Input/Input.style';

initStoryshots({});

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

  test('should have proper props for input field', () => {
    expect(wrapper.find('input').at(0).props()).toEqual({
      onInput: expect.any(Function),
      value: "",
      placeholder: expect.any(String),
      className: expect.any(String),
      autoFocus: true,
      type: "text",
      required: expect.any(Boolean),
    });
  });

  test("test input onChange", () => {
    const mockCallBack = jest.fn();
    const input = mount(<StyledInput onInput={mockCallBack}/>);
    input.find("input").simulate("input");
    expect(mockCallBack).toHaveBeenCalled();
  });

  test("first input have autofocus by default", () => {
    // const handleFilter = jest.fn();
    const styledInput = wrapper.find(StyledInput);
    expect(styledInput.at(0).prop('autoFocus')).toBeTruthy();
  });

  test("handreFilter work on first input while change value", () => {
    const handleFilter = jest.fn();
    const styledInput = wrapper.find(StyledInput);
    styledInput.at(0).find("input").simulate('input');
    expect(handleFilter.mock.calls.length).toEqual(0);

  });

  test("handreFilter work on second input while change value", () => {
    const handleFilter = jest.fn();
    const styledInput = wrapper.find(StyledInput);
    styledInput.at(1).find("input").simulate('input');
    expect(handleFilter.mock.calls.length).toEqual(0);
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
    expect(DatePickerActivate.find("div")).toBeDefined();
  });
  
  test("see dropdown after click", () => {
    const DatePickerActivate = wrapper.find(DatePickerActivateField);
    DatePickerActivate.find("div").simulate("click");
    expect(wrapper.find(DatePicker)).toBeDefined();
  });

});

describe("button", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<TicketSearch/>)
  });

  test("render a button on the page", () => {
    expect(wrapper.find("button").toBeDefined);
  })
})


