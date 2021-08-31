import App from './App';
import {shallow} from "enzyme";

test("render of App", () => {
  const wrapper = shallow(<App/>);
  expect(wrapper).not.toBenull;
});