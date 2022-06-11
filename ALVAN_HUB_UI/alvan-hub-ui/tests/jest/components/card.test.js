import 'jsdom-global/register';
import React from "react";
import Card from "../../../src/js/components/card";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from "enzyme";
import { uniqueNamesGenerator, names } from 'unique-names-generator';

configure({adapter: new Adapter()});

const config = {
  dictionaries: [names]
};

describe('Card', () => {
  it("should have default prop values", ()=>{
    const props = {
      name: '',
      children: '',
      lockedWidth: undefined,
      posX: undefined,
      posY: undefined
    }
    const card = mount(<Card />);
    expect(card.props()).toEqual(props);
  })

  it("should have non-default prop values", ()=>{
    const props = {
      name: uniqueNamesGenerator(config),
      children: uniqueNamesGenerator(config),
      lockedWidth: "default",
      posX: 100,
      posY: 100
    }
    const card = mount(<Card {...props}>{props.children}</Card>);
    expect(card.props()).toEqual(props);
  })
});