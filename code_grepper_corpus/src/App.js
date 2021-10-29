import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Home from './components/Pages'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
          <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
