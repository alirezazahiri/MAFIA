import { Switch, Route } from "react-router-dom";

// Contexts
import LanguageContextProvider from "./contexts/LanguageContextProvider";
import RolesContextProvider from "./contexts/RolesContextProvider";

// Components
import Home from "./components/Home";
import GameSetup from "./components/GameSetup";
import PlayerButtons from "./components/PlayerButtons";
import Scenarios from './components/Scenarios';
import GodVision from './components/GodVision';
import Bg from './components/background/Bg';
import NavBar from './components/Navbar';

const App = () => {
  return (
    <LanguageContextProvider>
      <RolesContextProvider>
        <NavBar />
        <Switch>
          <Route path="/god-vision" component={GodVision} />
          <Route path="/scenarios" component={Scenarios} />
          <Route path="/players-roles" component={PlayerButtons} />
          <Route path="/game-setup" component={GameSetup} />
          <Route path="/" component={Home} exact />
        </Switch>
        <Bg />
      </RolesContextProvider>
    </LanguageContextProvider>
  );
};

export default App;
