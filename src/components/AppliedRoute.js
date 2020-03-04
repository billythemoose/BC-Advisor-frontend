import React from 'react';
import {Route} from 'react-router-dom';

/* Enhances Routes by routing to the Component with supplied props and new props*/
export default function AppliedRout({ component: C, appProps, ...rest }) {
    return (
        <Route {...rest} render={props => <C {...props} {...appProps} />} />
    );
}