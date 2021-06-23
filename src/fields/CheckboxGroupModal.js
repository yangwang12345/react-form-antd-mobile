import React, { useState, useEffect, useMemo } from 'react';
import { Checkbox, Modal, List, Button, Flex } from 'antd-mobile';
import { hooks } from '@kne/react-form-helper';
import withComponentPropsClassName from '../common/withComponentPropsClassName';
import _get from 'lodash/get';

const { useOnChange } = hooks;

const CheckboxItem = Checkbox.CheckboxItem;

const Item = List.Item;

const CheckboxGroupModal = ({ value: propsValue, placeholder, onChange, options }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(propsValue);
  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);
  const labels = useMemo(() => {
    return value.map((value) => {
      return _get(options.find((item) => item.value === value), 'label');
    }).join(',');
  }, [value, options]);
  return (
    <Item arrow="horizontal" onClick={() => {
      setVisible(true);
    }}>
      {labels || placeholder || '请选择'}
      <Modal wrapClassName="react-form__checkbox-group-modal" visible={visible}
             title={<Flex>
               <Button size="small" inline onClick={(e) => {
                 e.stopPropagation();
                 setVisible(false);
                 setValue(propsValue);
               }}>返回</Button>
               <Flex.Item>{placeholder || '请选择'}</Flex.Item>
               <Button type="primary" size="small" inline onClick={(e) => {
                 e.stopPropagation();
                 setVisible(false);
                 onChange(value);
               }}>确定</Button>
             </Flex>}
             onClose={(e) => {
               e.stopPropagation();
               setVisible(false);
             }}>
        <List>
          {
            options.map((item) => {
              return <CheckboxItem key={item.value} checked={value.indexOf(item.value) > -1}
                                   onChange={(e) => {
                                     if (e.target.checked) {
                                       setValue([...value, item.value]);
                                     } else {
                                       const newValue = value.slice(0);
                                       const index = newValue.indexOf(item.value);
                                       newValue.splice(index, 1);
                                       setValue(newValue);
                                     }
                                   }}>{item.label}</CheckboxItem>;
            })
          }
        </List>
      </Modal>
    </Item>
  );
};

CheckboxGroupModal.defaultProps = {
  value: []
};

const _CheckboxGroup = (props) => {
  const render = useOnChange(withComponentPropsClassName(props, 'type-checkbox-group-modal'));
  return render(CheckboxGroupModal);
};

export default _CheckboxGroup;
