import React from 'react';
import LayoutPage from './pages/Layout';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route to="/" component={LayoutPage}></Route>
      </Router>
    </Provider>

  );
}

export default App;
