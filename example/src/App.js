import Form, {
  InputItem,
  DatePicker,
  Switch,
  Checkbox,
  CheckboxGroupModal,
  CheckboxGroup,
  RadioGroup,
  Picker,
  Avatar,
  Upload,
  ImagePicker,
  SubmitButton,
  interceptors,
  TreeInput,
  preset
} from '@kne/react-form-antd-mobile';
import { List } from 'antd-mobile';
import axios from 'axios';

interceptors.input.use('date', (value) => {
  return new Date(value);
});

interceptors.output.use('alone-array', (value) => {
  return value[0];
});

interceptors.input.use('alone-array', (value) => {
  return [value];
});

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

/*[{
  'key': 5,
  'title': '根节点',
  'disabled': true,
  'children': [{
    'key': 1,
    'title': '管理序列',
    'disabled': true,
    'children': [{ 'key': 1, 'title': 'S1' }, { 'key': 24, 'title': 'S3' }]
  }, { 'key': 4, 'title': '专业序列', 'disabled': true, 'children': [{ 'key': 2, 'title': 'S2' }] }]
}]*/

const treeData = [
  {
    key: '0-0',
    title: 'parent 1',
    children: [
      { key: '0-0-0', title: 'parent 1-1', children: [{ key: '0-0-0-0', title: 'parent 1-1-0' }] },
      {
        key: '0-0-1',
        title: 'parent 1-2',
        disabled: true,
        children: [
          { key: '0-0-1-0', title: 'parent 1-2-0' },
          { key: '0-0-1-1', title: 'parent 1-2-1' },
          { key: '0-0-1-2', title: 'parent 1-2-2' },
          { key: '0-0-1-3', title: 'parent 1-2-3' },
          { key: '0-0-1-4', title: 'parent 1-2-4' },
          { key: '0-0-1-5', title: 'parent 1-2-5' },
          { key: '0-0-1-6', title: 'parent 1-2-6' },
          { key: '0-0-1-7', title: 'parent 1-2-7' },
          { key: '0-0-1-8', title: 'parent 1-2-8' },
          { key: '0-0-1-9', title: 'parent 1-2-9' }
        ]
      }
    ]
  }
];

function App() {
  return (
    <div>
      <Form
        debug
        data={{
          'imgs': [
            {
              url: 'http://static.knxgalaxy.com/upload_assets/app/7397ed79ebc7a28034941156d78747ac.jpeg',
              filename: 'xxx.jpg'
            }
          ],
          date: '2010-07-21 00:01'
        }}
        onSubmit={data => {
          console.log(data);
        }}>
        <List>
          <TreeInput className="xxxxx" name="tree" label="树选择" rule="REQ" interceptor="alone-array" treeData={treeData} defaultExpandAll/>
          <Upload name="file" label="文件"/>
          <Avatar name="avatar" label="头像"/>
          <ImagePicker name="imgs" label="图片" multiple/>
          <InputItem name="name" label="名称" rule="LEN-0-10" placeholder="请填写"/>
          <InputItem name="name2" label="名称" rule="LEN-0-10"/>
          <DatePicker name="date" label="日期" interceptor="date"/>
          <Switch name="swtich" label="开关"/>
          <Picker name="picker" label="选择" data={[{ label: '啊啊啊', value: 0 }, { label: '重中之重', value: 1 }]}/>
          <CheckboxGroupModal name="checkboxModal" label="多选" options={[
            { label: '啊啊啊', value: 0 },
            { label: '哈哈哈哈哈', value: 1 }
          ]} placeholder="请填写"/>
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
