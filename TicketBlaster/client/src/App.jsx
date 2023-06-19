import { Route, Routes } from "react-router-dom";
import "./assets/css/Globals.css";
import { MainLayout } from "./components/Layout/Main/MainLayout";
import { CreateAccount } from "./pages/Account/CreateAccount/CreateAccount";
import { ForgotPassword } from "./pages/Account/ForgotPassword/ForgotPassword";
import { LoginPage } from "./pages/Account/Login/LoginPage";
import { ResetPassword } from "./pages/Account/ResetPasswrod/ResetPassword";
import { Home } from "./pages/Dashboard/Home";
import { ComedyShows } from "./pages/Events/ComedyShows";
import { MusicalConcerts } from "./pages/Events/MusicalConcerts";
import { SingleProduct } from "./pages/Events/SingleProduct";
import { TicketHistory } from "./pages/Panel/TicketHistory";
import { UserDetails } from "./pages/Panel/UserDetails";
function App() {
  return (
    <Routes>
      <Route
        element={
          // <AuthProvider>
          <MainLayout />
          // </SearchProvider>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/musicalconcerts" element={<MusicalConcerts />} />
        <Route path="/comedyshows" element={<ComedyShows />} />
        <Route path="/singleproduct" element={<SingleProduct />} />
        <Route path="/panel/history" element={<TicketHistory />} />
        <Route path="/panel/details" element={<UserDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
