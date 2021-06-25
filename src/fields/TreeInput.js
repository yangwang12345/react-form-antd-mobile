import React, { useEffect, useState, useMemo } from 'react';
import Tree from 'rc-tree';
import { hooks } from '@kne/react-form-helper';
import { Button, Flex, List, Modal } from 'antd-mobile';
import withComponentPropsClassName from '../common/withComponentPropsClassName';

const { useOnChange } = hooks;

const Item = List.Item;

const TreeInput = ({ className, value: propsValue, placeholder, onChange, treeData, ...props }) => {
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
    <Item className={className} arrow="horizontal" onClick={() => {
      setVisible(true);
    }}>
      {labels || placeholder || '请选择'}
      <Modal wrapClassName="react-form__tree-input" visible={visible}
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
        <Tree {...props} selectedKeys={value} onSelect={(selectedKeys) => {
          setValue(selectedKeys);
        }} treeData={treeData}/>
      </Modal>
    </Item>
  );
};

TreeInput.defaultProps = {
  value: []
};

const _TreeInput = (props) => {
  const render = useOnChange(withComponentPropsClassName(props, 'type-tree-input'));
  return render(TreeInput);
};

export default _TreeInput;