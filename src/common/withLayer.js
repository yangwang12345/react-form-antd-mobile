import ReactDOM from 'react-dom';
import React, {createRef, useState, useImperativeHandle} from 'react';

const withLayer = (WrappedComponent) => {
  return ({onCancel, onDestroy, outRef, ...props}) => {
    const [visible, setVisible] = useState(true);
    useImperativeHandle(outRef, () => {
      return {
        close: () => setVisible(false),
        setVisible,
        visible
      };
    }, [visible, setVisible]);

    return <WrappedComponent {...props} visible={visible} close={() => setVisible(false)} onCancel={(...args) => {
      setVisible(false);
      onCancel && onCancel(...args);
    }} afterClose={onDestroy}/>;
  };
};

export default (WrappedComponent) => {
  const LayerComponent = withLayer(WrappedComponent);
  const ref = createRef(null);
  const root = document.createElement('div'),
    body = document.body;
  return (props) => {
    body.appendChild(root);
    setTimeout(() => {
      ReactDOM.render(<LayerComponent outRef={ref} {...props} onDestroy={() => {
        ReactDOM.unmountComponentAtNode(root);
        body.removeChild(root);
      }}/>, root);
    });
    return ref;
  };
};
