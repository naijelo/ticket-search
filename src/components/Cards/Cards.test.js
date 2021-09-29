import React from "react";
import { shallow } from "enzyme";
import Cards from "./Cards";

describe("cards", () => {
    test("cards generate three list item", () => {
        const props = {
            ticketData: ["ONE", "TWO", "THREE"]
        }
        let wrapper = shallow(<Cards {...props} />).find("li");
        expect(wrapper.length).toBe(3);
    });

    test("cards generate error text if there are no getting data from server", () => {
        const props = {
            dataError: true
        }
        let wrapper = shallow(<Cards {...props} />).find("h3");
        expect(wrapper.length).toBe(1);
    });
})

