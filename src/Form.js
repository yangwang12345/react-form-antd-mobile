import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactForm, { util } from '@kne/react-form';
import { widget } from '@kne/react-form-helper';
import preset from './preset';

'./preset';
import './assets/index.scss';

export * from '@kne/react-form';
export { hooks, utils } from '@kne/react-form-helper';

preset({
  rules: {
    REQ: function(value) {
      return {
        result: util.isNotEmpty(value),
        errMsg: '请填写%s'
      };
    }
  }
});

const { ScrollToError, EnterSubmit, FormStore } = widget;

const Form = forwardRef(({ className, cache, enterSubmit, scrollToError, scrollProps, children, ...props }, ref) => {
  let computedClass = 'react-form';

  return (
    <form className={classnames(computedClass, className)} onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}>
      <ReactForm {...props} ref={ref}>
        {cache ? <FormStore cache={cache}/> : null}
        {scrollToError ? <ScrollToError scrollProps={scrollProps}/> : null}
        {enterSubmit ? <EnterSubmit>
          {children}
        </EnterSubmit> : children}
      </ReactForm>
    </form>
  );
});

Form.defaultProps = {
  type: 'default',
  size: 'middle',
  scrollToError: true,
  enterSubmit: false,
  scrollProps: {
    block: 'center'
  }
};

Form.propTypes = {
  className: PropTypes.string,
  enterSubmit: PropTypes.bool,
  scrollToError: PropTypes.bool,
  scrollProps: PropTypes.shape({
    block: PropTypes.oneOf(['start', 'center', 'end', 'nearest']),
    behavior: PropTypes.oneOf(['auto', 'smooth']),
    inline: PropTypes.oneOf(['start', 'center', 'end', 'nearest'])
  })
};

export default Form;