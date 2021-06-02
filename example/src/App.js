import Form, {
  InputItem,
  DatePicker,
  Switch,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Picker,
  SubmitButton
} from 'react-form-antd-mobile';
import { List } from 'antd-mobile';

function App() {
  return (
    <div>
      <Form
        debug
        data={{}}
        onSubmit={data => {
          console.log(data);
        }}>
        <List>
          <InputItem name="name" label="名称" rule="REQ LEN-0-10"/>
          <InputItem name="name2" label="名称" rule="REQ LEN-0-10"/>
          <DatePicker name="date" label="日期" rule="REQ"/>
          <Switch name="swtich" label="开关"/>
          <Picker name="picker" label="选择" data={[{ label: '啊啊啊', value: 0 }, { label: '重中之重', value: 1 }]}/>
          <CheckboxGroup name="checkbox" label="多选" options={[
            { label: '啊啊啊', value: 0 },
            { label: '哈哈哈哈哈', value: 1 }
          ]}/>
          <RadioGroup name="radio" label="单选" options={[
            { label: '啊啊啊', value: 0 },
            { label: '哈哈哈哈哈', value: 1 }
          ]}/>
          <Checkbox name="hhhh" label="嗷嗷" value="xx">是颠倒是非</Checkbox>
        </List>
        <SubmitButton>提交</SubmitButton>
      </Form>
    </div>
  );
}

export default App;
