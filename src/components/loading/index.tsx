import React from 'react';
import './style.less';

interface iProps {
    enabled: boolean;
}

export default class Loading extends React.Component<iProps> {
    static defaultProps = {
        enabled: true
    };

    render() {
        const {children, enabled} = this.props;
        return (
            <div className={`wb-loading ${enabled ? 'active' : ''}`}>
                {children}
                {enabled &&
                <div className='wb-loading-bg'>
                <span className='wb-loading-ico'>
                    <i/><i/><i/><i/>
                </span>
                </div>}
            </div>
        );
    }
}
