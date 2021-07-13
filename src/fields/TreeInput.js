import React, { useEffect, useState, useMemo } from 'react';
import Tree from 'rc-tree';
import { hooks } from '@kne/react-form-helper';
import { Button, Flex, List, Modal } from 'antd-mobile';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange } = hooks;

const Item = List.Item;

const TreeInput = ({ className, value: propsValue, okText, placeholder, onChange, treeData, ...props }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(propsValue);
  const labels = useMemo(() => {
    const output = [];
    const menuTreeTraverse = (nodeList, mapCallback) => {
      return nodeList.map(({ children, ...item }) => {
        const newItem = mapCallback(item, children);
        if (children && Array.isArray(children)) {
          newItem.children = menuTreeTraverse(children, mapCallback);
        }
        return newItem;
      });
    };
    menuTreeTraverse(treeData, (node) => {
      if (value.indexOf(node.key) > -1) {
        output.push(node.title);
      }
      return node;
    });

    return output.join(',');
  }, [value, treeData]);
  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);
  return (
    <div className={className}>
      <Item arrow="horizontal" onClick={() => {
        setVisible(true);
      }}>
        {labels || placeholder || '请选择'}
        <Modal wrapClassName="react-form__tree-input" visible={visible}
               title={<Flex className="react-form__model-title">
               <span className="react-form__model-back" onClick={(e) => {
                 e.stopPropagation();
                 setVisible(false);
                 setValue(propsValue);
               }}/>
                 <Flex.Item className="react-form__model-center">{placeholder || '请选择'}</Flex.Item>
               </Flex>}
               onClose={(e) => {
                 e.stopPropagation();
                 setVisible(false);
               }}>
          <div className="react-form__model-inner">
            <Tree {...props} selectedKeys={value} onSelect={(selectedKeys) => {
              setValue(selectedKeys);
            }} treeData={treeData}/>
          </div>
          <div className="react-form__model-footer">
            <Button type="primary" className="react-form__model-ok-btn" onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
              onChange(value);
            }}>{okText}</Button>
          </div>
        </Modal>
      </Item>
    </div>
  );
};

TreeInput.defaultProps = {
  value: [],
  okText: '确定'
};

const _TreeInput = (props) => {
  const render = useOnChange(withComponentPropsClassName(props, 'type-tree-input'));
  return render(TreeInput);
};

_TreeInput.field = TreeInput;

export default _TreeInput;