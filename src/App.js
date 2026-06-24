import {Header, Footer,ScrollToTop} from "./components";
import AllRoutes from "./routes/AllRoutes";
import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <ScrollToTop/>
      <AllRoutes/>
      <Footer />
    </div>
  );
}

export default App;
