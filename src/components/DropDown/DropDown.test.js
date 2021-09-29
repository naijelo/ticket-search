import React from "react";
import { shallow, mount, render } from "enzyme";
import DropDown from "./DropDown";

describe("dropdown", () => {
    test("get list items and release", () => {
        const props = {
            filteredData: ["First", "Second", "Third", "Fourth"]
        }
        const wrapper = shallow(<DropDown {...props} />).find("li");
        expect(wrapper.length).toBe(4);
    })

    test("get data after click", () => {
        const addCity = jest.fn();
        const props = {
            filteredData: ["First", "Second", "Third", "Fourth"],
            addCity
        }
        const wrapper = shallow(<DropDown {...props} />).find("li").at(1);
        wrapper.simulate("click");
        expect(addCity).toHaveBeenCalled();
    })
})
