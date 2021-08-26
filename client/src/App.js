import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AlbumDetail from './Components/AlbumDetail';
import Album from './Pages/Album';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Tracks from './Pages/Tracks';
import LoaderProvider from './Provider/LoaderProvider';
import PrivateRoute from './Router/PrivateRouter';


toast.configure();
function App() {
  return (
    <Router>
      <Switch>
        <LoaderProvider>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/register"><Register /></Route>
          <PrivateRoute exact path="/tracks"><Tracks /></PrivateRoute>
          <PrivateRoute exact path="/albums"><Album /></PrivateRoute>
          <PrivateRoute exact path="/albumdetail/:id"><AlbumDetail /></PrivateRoute>
          <Route path="/not-found" component={() => <h1>404 not found</h1>}></Route>
          {/* <Redirect to="/not-found" /> */}
        </LoaderProvider>
      </Switch>
    </Router>
  );
}

export default App;
