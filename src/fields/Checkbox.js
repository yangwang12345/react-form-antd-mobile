import { Checkbox as _Checkbox } from 'antd-mobile';
import { hooks, hoc } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange, useCheckedToValue } = hooks;
const { withChecked } = hoc;

const CheckboxItem = _Checkbox.CheckboxItem;

const WithCheckbox = withChecked(CheckboxItem);

const Checkbox = (props) => {
  const checkedProps = useCheckedToValue(withComponentPropsClassName(props,'type-checkbox'));
  const render = useOnChange(checkedProps);
  return render(WithCheckbox);
};

export default Checkbox;
