import React, { useState, useEffect } from 'react';
import { List, Modal, Button } from 'antd-mobile';
import { globalParams } from '../preset';
import { hooks } from '@kne/react-form-helper';
import { PhotoView } from '@kne/react-photo-view';
import classnames from 'classnames';
import withComponentPropsClassName from '../common/withComponentPropsClassName';
import withLayer from '../common/withLayer';
import '@kne/react-photo-view/dist/index.css';

const Preview = ({ loading, error, images }) => {
  if (loading) {
    return <div>正在生产文件预览...</div>;
  }
  if (error) {
    return <div>预览失败:{error}</div>;
  }
  return <PhotoView images={images}/>;
};

const createPreview = withLayer(({ url, close, ...props }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (/\.(pdf|doc|docx)$/.test(url)) {
      setLoading(true);
      globalParams.field.upload.transformImg({ url }).then((list) => {
        setImages(list);
      }, (e) => {
        setError('解析失败');
      }).finally(() => {
        setLoading(false);
      });
    } else if (/\.(jpg|png|gif)$/.test(url)) {
      setImages([url]);
    } else {
      setError('格式不支持');
    }
  }, [url]);
  return <Modal {...props} closable onClose={close} title="预览" className="upload-field__preview-modal">
    <Preview className="upload-field__preview" loading={loading} error={error} images={images}/>
  </Modal>;
});

const Upload = ({ className, maxLength, selectable, multiple, accept, onChange, value }) => {
  return <div className={classnames(className, 'upload-field')}>
    {Array.isArray(value) ? value.map((item, index) => {
      return <List.Item key={item.url}>
        <div className="upload-field__title">{item.filename}</div>
        <div>
          <a className="upload-field__btn upload-field__download-btn" href={item.url} download={item.filename}>下载</a>
          <span className="upload-field__btn upload-field__preview-btn"
                onClick={() => createPreview({ url: item.url })}>预览</span><span
          onClick={() => {
            const newValue = value.slice(0);
            newValue.splice(index, 1);
            onChange(newValue);
          }} className="upload-field__btn upload-field__del-btn">删除</span></div>
      </List.Item>;
    }) : null}
    {!selectable || value.length >= maxLength || (!multiple && value.length > 0) ? null :
      <div className="upload-field__btn">
        <input type="file" accept={accept} multiple={multiple} onChange={async (e) => {
          Promise.all([].map.call(e.target.files, (file) => {
            return globalParams.field.upload.uploadSender({ file });
          })).then((list) => {
            onChange([...value, ...list]);
          });
        }}/>
      </div>}
  </div>;
};

Upload.defaultProps = {
  value: [],
  selectable: true,
  multiple: false,
  maxLength: 4,
  accept: '*'
};

const { useOnChange } = hooks;

const _Upload = (props) => {
  const render = useOnChange(withComponentPropsClassName(props));
  return render(Upload);
};

export default _Upload;

