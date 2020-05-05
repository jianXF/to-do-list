import * as React from 'react';
import * as ReactDom from 'react-dom';
import 'babel-polyfill';
import './style';
import Index from './page';

ReactDom.render(
    <Index/>,
    document.getElementById('app')
);