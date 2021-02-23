import React from 'react';
import WithRoot from './modules/root'
import AppBarView from './modules/views/app.component.view.appbar';
import StarterMajor from './modules/views/app.component.view.started';
import StarterDetail from './modules/views/app.component.view.started.detail';
import StarterConclusion from './modules/views/app.component.view.conclude';
import AppFooter from './modules/views/app.component.view.footer';

function Index() {
    return (
        <React.Fragment>
            <AppBarView />
            <StarterMajor /> 
            <StarterDetail />
            <StarterConclusion />
            <AppFooter />
        </React.Fragment>
    )
}

export default WithRoot(Index);