import React from 'react';
import { Switch as _Switch, List } from 'antd-mobile';
import { hooks, hoc } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange, useCheckedToValue } = hooks;
const { withChecked } = hoc;
const WithSwitch = withChecked(_Switch);

const SwitchItem = (props) => {
  return <List.Item><WithSwitch {...props}/></List.Item>;
};

const Switch = (props) => {
  const checkedProps = useCheckedToValue(withComponentPropsClassName(props, 'type-switch'));
  const render = useOnChange(checkedProps);
  return render(SwitchItem);
};

export default Switch;
