import React from 'react';
import {useReset} from '@kne/react-form';
import {Button} from 'antd-mobile';

const ResetButton = (props) => {
    const resetProps = useReset();
    return (
        <Button {...resetProps} {...props}/>
    );
};

export default ResetButton;
