import { Switch as _Switch } from 'antd-mobile';
import { hooks, hoc } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange, useCheckedToValue } = hooks;
const { withChecked } = hoc;
const WithSwitch = withChecked(_Switch);

const Switch = (props) => {
  const checkedProps = useCheckedToValue(withComponentPropsClassName(props, 'type-switch'));
  const render = useOnChange(checkedProps);
  return render(WithSwitch);
};

export default Switch;
