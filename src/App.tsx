import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Index from './Home';
import PreClass from './modules/views/EntranceClass';
import PreInstructor from './modules/views/EntranceInstructor';
import SectionClass from './modules/components/classes/SectionClass'
import SectionClassForInst from './modules/components/classes/SectionClassForInst';
import SectionError from './modules/components/classes/SectionError';

//const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/classes" component={PreClass} />
        <Route exact path="/classes/:token" component={SectionClass} />
        <Route exact path="/instructors" component={PreInstructor} />
        <Route exact path="/instructors/:token" component={SectionClassForInst} />
        <Route exact path="/error" component={SectionError} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>

  );
}

export default App;
