import React from 'react';
import { Radio } from 'antd-mobile';
import { hooks } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange } = hooks;

const RadioItem = Radio.RadioItem;

const RadioGroup = ({ value, onChange, options }) => {
  return options.map((item) => {
    return <RadioItem key={item.value} checked={value === item.value}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onChange(item.value);
                        } else {
                          onChange();
                        }
                      }}>{item.label}</RadioItem>;
  });
};

const _RadioGroup = (props) => {
  const render = useOnChange(withComponentPropsClassName(props, 'type-radio-group'));
  return render(RadioGroup);
};

export default _RadioGroup;

