import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';
import { uniqueNamesGenerator, names, NumberDictionary } from 'unique-names-generator';
import Card from '../../../src/js/components/card';

configure({ adapter: new Adapter() });

const configNames = {
  dictionaries: [names],
};
const configNums = {
  dictionaries: [NumberDictionary],
  seed: 1000,
};

describe('Card', () => {
  it('should have default prop values', () => {
    const props = {
      name: '',
      children: '',
      lockedWidth: undefined,
      posX: undefined,
      posY: undefined,
      zIndex: {},
      id: undefined,
      hasBeenClicked: () => {},
      lockedPos: false,
    };
    const card = mount(<Card />);
    expect(card.props().toString()).toEqual(props.toString());
  });

  it('should have non-default prop values', () => {
    const props = {
      name: uniqueNamesGenerator(configNames),
      children: uniqueNamesGenerator(configNames),
      lockedWidth: 'default',
      posX: 100,
      posY: 100,
      id: 6,
      zIndex: { 6: 50 },
      hasBeenClicked: () => null,
      lockedPos: true,
    };
    const card = mount(<Card {...props}>{props.children}</Card>);
    expect(card.props()).toEqual(props);
  });
});
