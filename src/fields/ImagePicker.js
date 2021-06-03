import React, { useState } from 'react';
import { ImagePicker } from 'antd-mobile';
import classnames from 'classnames';
import { hooks } from '@kne/react-form-helper';
import { globalParams } from '../preset';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange } = hooks;

const propsChange = (WrappedComponent) => {
  return ({ className, value, onChange, ...props }) => {
    const [loading, setLoading] = useState(false);
    return <WrappedComponent {...props} className={classnames(className, {
      'is-loading': loading
    })} files={value} onChange={(files) => {
      setLoading(true);

      const needUpload = files.filter((item) => {
        return item.file instanceof window.File;
      });

      const dontNeedUpload = files.filter((item) => {
        return !(item.file instanceof window.File);
      });
      Promise.all(needUpload.map((item) => {
        return globalParams.field.imagePicker.uploadSender(item);
      })).then((list) => {
        onChange([...dontNeedUpload, ...list]);
      }).finally(() => {
        setLoading(false);
      });
    }}/>;
  };
};

const NewImagePicker = propsChange(ImagePicker);

const _ImagePicker = (props) => {
  const render = useOnChange(withComponentPropsClassName(props, 'image-picker'));
  return render(NewImagePicker);
};

export default _ImagePicker;