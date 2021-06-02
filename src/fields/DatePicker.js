import React from 'react';
import { DatePicker, List } from 'antd-mobile';
import { hooks } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange } = hooks;

const _DatePicker = (props) => {
  const render = useOnChange(withComponentPropsClassName(props, 'type-date-pick'));
  return render(DatePicker);
};

_DatePicker.defaultProps = {
  children: <List.Item/>
};


export default _DatePicker;
