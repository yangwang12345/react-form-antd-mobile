import classnames from 'classnames';

const withComponentPropsClassName = ({ className, ...props }, newClassName) => {
  return { ...props, className: classnames(className, newClassName) };
};

export default withComponentPropsClassName;