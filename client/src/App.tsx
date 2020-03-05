import React from 'react';
import LayoutPage from './pages/Layout';
import { Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route to="/" component={LayoutPage}></Route>
    </Router>
  );
}

export default App;
