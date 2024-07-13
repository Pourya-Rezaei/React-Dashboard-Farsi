import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import { useRoutes } from "react-router-dom";
import routes from "./router/routes";
import "./css/App.css"
function App() {
  const router = useRoutes(routes)
  return (
    <>
      <Sidebar />
      <div className="main">
        <Header />
        {router}
      </div>
    </>
  );
}

export default App;
