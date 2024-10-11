import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

const App: React.FC = () => {
  const elem = useRoutes(routes);
  return elem;
};

export default App;
