import './theme/variables.css';
import './theme/custom.css';
import {Redirect, Route} from 'react-router-dom';
/* Theme variables */
import {
  createAnimation,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {square} from 'ionicons/icons';
import Tab1 from './pages/test_tabs_todelete/Tab1';
import Tab2 from './pages/test_tabs_todelete/Tab2';
import Tab3 from './pages/test_tabs_todelete/Tab3';
import Profile from "./pages/profile/Profile";
import Login from './pages/authentification/Login';
import RegisterUser from './pages/authentification/RegisterUser';
import IndexFarmers from './pages/farmers/IndexFarmers';
import FarmerSearchPage from './pages/farmers/FarmersSearch';
import FarmerDetailPage from './pages/farmers/FarmerDetailPage';
import NewsFarmerPage from './pages/farmers/NewsFarmerPage'
import MyFeedPage from "./pages/events/MyFeedPage";
import MapPage from "./pages/map/Map";

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


export const fadeTransition = (rootElement: any) => {
  const enteringAnimation = createAnimation()
      .addElement(document.createElement('div')) // Ajout d'un élément vide
      .duration(100)
      .fromTo('opacity', '0', '1');

  const leavingAnimation = createAnimation()
      .addElement(document.createElement('div')) // Ajout d'un élément vide
      .duration(100)
      .fromTo('opacity', '1', '0');

  return createAnimation()
      .duration(100)
      .addAnimation([enteringAnimation, leavingAnimation]);
};


setupIonicReact();

// @ts-ignore
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>

        <IonRouterOutlet animation={fadeTransition}>
          <Route exact path="/home">
            <Tab1 />
          </Route>
          <Route path="/events" component={MyFeedPage} exact/>

            <Route path="/farmers/:page/:farmerId" component={FarmerDetailPage} exact />
            <Route exact path="/farmers/:page">
                <IndexFarmers hide="yes" />
            </Route>
            <Route path="/farmers/:page/search/:searchQuery" component={FarmerSearchPage} exact />

            <Route exact path="/position">
              <MapPage />
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
          <IonTabButton tab="farmers" href="/farmers/producteurs">
            <IonIcon src={farmer} />
          </IonTabButton>
          <IonTabButton tab="position" href="/position">
            <IonIcon src={position} />
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon src={user} />
          </IonTabButton>




        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

/*
*
* <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>DEBUG TAB</IonLabel>
          </IonTabButton>
* */

export default App;
