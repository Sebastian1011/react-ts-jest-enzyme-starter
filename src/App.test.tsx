import React from 'react';
import App from './App';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const wrapper:any = shallow(<App/>);
  console.log(wrapper);
});
