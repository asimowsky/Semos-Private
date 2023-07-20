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
import { EventPanel } from "./pages/Panel/EventPanel";
import { EventDetails } from "./pages/Panel/EventDetails";
import { ShoppingCart } from "./pages/Shopping/ShoppingCart";
import { SearchPage } from "./pages/Search/SearchPage";
import { Checkout } from "./pages/Shopping/Checkout";
import { ThankYou } from "./pages/Shopping/ThankYou";
import { Users } from "./pages/Panel/Users";
import toast, { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster />

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
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/musicalconcerts" element={<MusicalConcerts />} />
          <Route path="/comedyshows" element={<ComedyShows />} />
          <Route path="/single/:id" element={<SingleProduct />} />
          <Route path="/panel/history" element={<TicketHistory />} />
          <Route path="/panel/details" element={<UserDetails />} />
          <Route path="/panel/events" element={<EventPanel />} />
          <Route path="/panel/users" element={<Users />} />
          <Route path="/panel/event/details" element={<EventDetails />} />
          <Route path="/shopping/cart" element={<ShoppingCart />} />
          <Route path="/shopping/checkout" element={<Checkout />} />
          <Route path="/shopping/thankyou" element={<ThankYou />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
