import Form from './Form';

import Avatar$ from './fields/Avatar';
import Checkbox$ from './fields/Checkbox';
import CheckboxGroup$ from './fields/CheckboxGroup';
import CheckboxGroupModal$ from './fields/CheckboxGroupModal';
import DatePicker$ from './fields/DatePicker';
import ImagePicker$ from './fields/ImagePicker';
import InputItem$ from './fields/InputItem';
import Picker$ from './fields/Picker';
import Radio$ from './fields/Radio';
import RadioGroup$ from './fields/RadioGroup';
import Switch$ from './fields/Switch';
import TextareaItem$ from './fields/TextareaItem';
import TreeInput$ from './fields/TreeInput';
import Upload$ from './fields/Upload';

export * from './Form';
export * from '@kne/react-form-helper';
export default Form;
export {default as preset} from './preset';
export {default as ResetButton} from './ResetButton';
export {default as SubmitButton} from './SubmitButton';

export const Avatar = Avatar$;
export const Checkbox = Checkbox$;
export const CheckboxGroup = CheckboxGroup$;
export const CheckboxGroupModal = CheckboxGroupModal$;
export const DatePicker = DatePicker$;
export const ImagePicker = ImagePicker$;
export const InputItem = InputItem$;
export const Picker = Picker$;
export const Radio = Radio$;
export const RadioGroup = RadioGroup$;
export const Switch = Switch$;
export const TextareaItem = TextareaItem$;
export const TreeInput = TreeInput$;
export const Upload = Upload$;

export const fields = { Avatar, Checkbox, CheckboxGroup, CheckboxGroupModal, DatePicker, ImagePicker, InputItem, Picker, Radio, RadioGroup, Switch, TextareaItem, TreeInput, Upload };