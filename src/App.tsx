import { Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import LandingPageLayout from "./components/landing-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
