import WithRoot from './modules/root';
import React from 'react';
import AppBarView from './modules/views/app.component.view.appbar';
import StarterMajor from './modules/views/app.component.view.started';
import SelectCond from './modules/components/app.component.cond';


//const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.Fragment>
      <AppBarView />
      <StarterMajor />
      
    </React.Fragment>
  );
}

export default WithRoot(App);
