import React from 'react';
import { hooks } from '@kne/react-form-helper';
import { List } from 'antd-mobile';
import { globalParams } from '../preset';
import AvatarUpload from '@kne/react-avatar-upload';
import '@kne/react-avatar-upload/dist/index.css';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange } = hooks;

const AvatarItem = ({ value, onChange, children, ...props }) => {
  return <AvatarUpload {...props} onChange={async (file) => {
    const { url } = await globalParams.field.avatar.uploadSender({ file });
    onChange(url);
  }}>
    <List.Item>
      {value ? <div className="avatar-field__content" style={{
        backgroundImage: `url("${value}")`
      }}></div> : null}
      <div className="avatar-field__upload-btn">{children || '上传头像'}</div>
    </List.Item>
  </AvatarUpload>;
};

const Avatar = (props) => {
  const render = useOnChange(withComponentPropsClassName(props, 'avatar'));
  return render(AvatarItem);
};

export default Avatar;
