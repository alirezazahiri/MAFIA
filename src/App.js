import { Switch, Route } from "react-router-dom";

// Contexts
import LanguageContextProvider from "./contexts/LanguageContextProvider";
import RolesContextProvider from "./contexts/RolesContextProvider";

// Components
import Home from "./components/Home";
import GameSetup from "./components/GameSetup";
import PlayerButtons from "./components/PlayerButtons";
import Scenarios from './components/Scenarios';
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <LanguageContextProvider>
      <RolesContextProvider>
        <Navbar />
        <Switch>
          <Route path="/scenarios" component={Scenarios} />
          <Route path="/players-roles" component={PlayerButtons} />
          <Route path="/game-setup" component={GameSetup} />
          <Route path="/" component={Home} exact />
        </Switch>
      </RolesContextProvider>
    </LanguageContextProvider>
  );
};

export default App;
