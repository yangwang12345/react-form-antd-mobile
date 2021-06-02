import { InputItem } from 'antd-mobile';
import { hooks } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useDecorator } = hooks;

const InputField = (props) => {
  const render = useDecorator(withComponentPropsClassName(props, 'type-input-item'));
  return render(InputItem);
};

InputField.defaultProps = {
  value: '',
  autoComplete: 'off'
};

export default InputField;
