import { TextareaItem } from 'antd-mobile';
import { hooks } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useDecorator } = hooks;

const TextareaItemField = (props) => {
  const render = useDecorator(withComponentPropsClassName(props, 'type-textarea-item'));
  return render(TextareaItem);
};

TextareaItemField.defaultProps = {
  value: '',
  autoComplete: 'off'
};

export default TextareaItemField;
