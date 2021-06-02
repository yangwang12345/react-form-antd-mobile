import { Radio } from 'antd-mobile';
import { hooks, hoc } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange, useCheckedToValue } = hooks;
const { withChecked } = hoc;

const RadioItem = Radio.RadioItem;

const WithRadio = withChecked(RadioItem);

const _Radio = (props) => {
  const checkedProps = useCheckedToValue(withComponentPropsClassName(props, 'type-radio'));
  const render = useOnChange(checkedProps);
  return render(WithRadio);
};

export default _Radio;
