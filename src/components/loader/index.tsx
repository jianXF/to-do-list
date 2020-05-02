import * as React from 'react';

/**
 * 模块说明
 * -------
 * 懒加载组件
 * @deprecated
 */

export default (loader: () => Promise<any>) => class Lazy extends React.Component<{
    [key: string]: any
}> {
    private mounted: boolean;

    state: {
        loaded: any
    } = {
        loaded: null
    };

    componentDidMount() {
        this.mounted = true;
        // load component
        loader().then((loaded:any) => this.mounted && this.setState({loaded})).catch(err => console.error(err));
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const {loaded} = this.state;
        if (loaded) {
            const Component = loaded.default;
            return <Component {...this.props}/>;
        } else return <div>123</div>;
    }
};
