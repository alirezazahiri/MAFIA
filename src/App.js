import { Switch, Route } from "react-router-dom";

// Contexts
import LanguageContextProvider from "./contexts/LanguageContextProvider";
import RolesContextProvider from "./contexts/RolesContextProvider";

// Components
import Home from "./components/Home";
import GameSetup from './components/GameSetup';

const App = () => {
  return (
    <LanguageContextProvider>
      <RolesContextProvider>
        <Switch>
          <Route path="/game-setup" component={GameSetup} />
          <Route path="/" component={Home} exact />
        </Switch>
      </RolesContextProvider>
    </LanguageContextProvider>
  );
};

export default App;
