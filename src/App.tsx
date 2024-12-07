import { Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import LandingPageLayout from "./components/landing-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageLayout />}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
