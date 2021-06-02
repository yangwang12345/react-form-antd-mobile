import React from 'react';
import { Checkbox } from 'antd-mobile';
import { hooks } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange } = hooks;

const CheckboxItem = Checkbox.CheckboxItem;

const CheckboxGroup = ({ value, onChange, options }) => {
  return options.map((item) => {
    return <CheckboxItem key={item.value} checked={value.indexOf(item.value) > -1}
                         onChange={(e) => {
                           if (e.target.checked) {
                             onChange([...value, item.value]);
                           } else {
                             const newValue = value.slice(0);
                             const index = newValue.indexOf(item.value);
                             newValue.splice(index, 1);
                             onChange(newValue);
                           }
                         }}>{item.label}</CheckboxItem>;
  });
};

CheckboxGroup.defaultProps = {
  value: []
};

const _CheckboxGroup = (props) => {
  const render = useOnChange(withComponentPropsClassName(props, 'type-checkbox-group'));
  return render(CheckboxGroup);
};

export default _CheckboxGroup;
