import { List, Picker } from 'antd-mobile';
import { hooks } from '@kne/react-form-helper';
import React from 'react';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange } = hooks;

const _Picker = (props) => {
  const render = useOnChange(withComponentPropsClassName(props, 'type-pick'));
  return render(Picker);
};

_Picker.defaultProps = {
  children: <List.Item/>
};

export default _Picker;
