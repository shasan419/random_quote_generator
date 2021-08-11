import { Route, Switch } from "react-router";
import Home from "./views/Home/Home";
import Rated from "./views/Rated/Rated";

function App() {
  return (
    <Switch>
      <Route path="/rated" component={Rated} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
}

export default App;
