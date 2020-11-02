import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

class PrivateRoute extends Component {


    render() {
        let { ...rest} = this.props;
        return  <Route
                    key={this.props.routePath}
                    {...rest}
                />;

    }
}

export default withRouter(PrivateRoute);
