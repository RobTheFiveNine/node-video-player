import { create, act } from 'react-test-renderer';
import React from 'react';
import Video from '../Video';

it('should render correctly', () => {
  let root;
  act(() => {
    root = create(<Video src="file.mp4" />);
  });

  expect(root.toJSON()).toMatchSnapshot();
});
