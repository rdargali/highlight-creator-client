import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reducer from "./store/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Test from "./components/Test";
import Clip from "./components/Clips/Clip";
import BaseLayout from "./components/BaseLayout";
import UploadVideo from "./components/UploadVideo";
import Video from "./components/Video"
import PlaylistsMenu from "./components/Playlists/PlaylistsMenu"
import Profile from "./components/Profile"
import Playlist from "./components/Playlists/Playlist"
import Highlights from './components/Highlights/Highlights'
import SeeHighlight from './components/Highlights/SeeHighlight'
import axios from 'axios'

// CSS IMPORTS
import './css/AppBar.css'
import './css/Video.css'
import './css/App.css'
import './css/PlaylistsMenu.css'
import './css/Footer.css'
// axios authorization headers
try {
let user = JSON.parse(localStorage.user)
let creator_id = user.sub
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwt}`;
axios.defaults.headers.common['request_user_id'] = creator_id;
axios.defaults.headers.common['Content-Type'] = 'applicaton/json'
}
catch(err) {
  //what do we want this error to do?
}
// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
  console.log(window.location.pathname);
};
const store = createStore(
  reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/test" component={Test} />
            <Route path="/clips" component={Clip} />
            <Route path="/upload" component={UploadVideo} />
            <Route path="/video" component={Video} />
            <Route path="/your-playlists" component={PlaylistsMenu} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/your-highlights" component={Highlights} />
            <Route path="/highlight" component={SeeHighlight} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();