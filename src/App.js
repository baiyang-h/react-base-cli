import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// 组件
import Home from '@/pages/Home'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Page404 from '@/pages/Page404'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/app'>Layout</Link>
          <Link to='/login'>Login</Link>
          <Link to='/Page404'>Page404</Link>
        </div>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/app" component={ Layout } />
          <Route exact path="/login" component={ Login } />
          <Route component={ Page404 } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
