import * as React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from './home'

export default class Index extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Redirect to='/'/>
                </Switch>
            </Router>
        )
    }
}