import './theme/variables.css';
import './theme/custom.css';
import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { images, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/test_tabs_todelete/Tab1';
import Tab2 from './pages/test_tabs_todelete/Tab2';
import Tab3 from './pages/test_tabs_todelete/Tab3';
import Profile from "./pages/profile/Profile";
import Login from './pages/authentification/Login';
import RegisterUser from './pages/authentification/RegisterUser';
import FarmerPage from './pages/farmers/Farmers';
import FarmerSearchPage from './pages/farmers/FarmersSearch';
import FarmerDetailPage from './pages/farmers/FarmerDetailPage';




/* Icons imports */
import home from '../src/icons/home.svg';
import calendar from '../src/icons/calendar.svg';
import farmer from '../src/icons/farmer.svg';
import position from '../src/icons/position.svg';
import user from '../src/icons/user.svg';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */





setupIonicReact();

const App: React.FC = () => (
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>

        <IonRouterOutlet>

          <Route exact path="/home">
            <Tab1 />
          </Route>
          <Route exact path="/events">
            <Tab2 />
          </Route>
          <Route path="/farmers/:farmerId" component={FarmerDetailPage} exact />
          <Route path="/farmers" component={FarmerPage} exact />
          <Route path="/farmers/search/:searchQuery" component={FarmerSearchPage} exact />

          <Route exact path="/position">
            <Tab2 />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registerUser">
            <RegisterUser />
          </Route>
        </IonRouterOutlet>


        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon src={home} />
          </IonTabButton>
          <IonTabButton tab="events" href="/events">
            <IonIcon src={calendar} />
          </IonTabButton>
          <IonTabButton tab="farmers" href="/farmers">
            <IonIcon src={farmer} />
          </IonTabButton>
          <IonTabButton tab="position" href="/position">
            <IonIcon src={position} />
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon src={user} />
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>DEBUG TAB</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
