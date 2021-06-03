import Form, {
  InputItem,
  DatePicker,
  Switch,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Picker,
  Avatar,
  Upload,
  ImagePicker,
  SubmitButton,
  preset
} from 'react-form-antd-mobile';
import { List } from 'antd-mobile';
import axios from 'axios';

const uploadSender = ({ file }) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/open-api/upload_static_file/app', formData, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(({ data }) => {
    if (data.code !== 200) {
      throw new Error(data.msg || '上传失败');
    }
    return {
      url: 'http://static.knxgalaxy.com' + data.results[0].targetPath,
      filename: data.results[0].filename
    };
  });
};

preset({
  field: {
    avatar: {
      uploadSender
    },
    imagePicker: {
      uploadSender
    },
    upload: {
      uploadSender,
      transformImg: ({ url }) => {
        return axios.post('/convert/toImage', { url }, {
          headers: {
            'content-type': 'application/json'
          }
        }).then(({ data }) => {
          if (data.code === 0) {
            return data.data;
          } else {
            throw new Error(data.msg || '转换错误');
          }
        });
      }
    }
  }
});

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
          <Upload name="file" label="文件"/>
          <Avatar name="avatar" label="头像"/>
          <ImagePicker name="imgs" label="图片" multiple/>
          <InputItem name="name" label="名称" rule="LEN-0-10"/>
          <InputItem name="name2" label="名称" rule="LEN-0-10"/>
          <DatePicker name="date" label="日期"/>
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
