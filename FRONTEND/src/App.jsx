import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./componenets/HOME/Home";
import Layout from "./componenets/LAYOUT/Layout";
import PersonalInfo from "./componenets/PROFILE/ProfilePopups/PersonalInfo";
import Deposit from "./componenets/PROFILE/ProfilePopups/Deposit";
import Withdraw from "./componenets/PROFILE/ProfilePopups/Withdraw";
import Profile from "./componenets/PROFILE/Profile";
import BankAccount from "./componenets/PROFILE/ProfilePopups/BankAcount";
import FundRecords from "./componenets/PROFILE/ProfilePopups/FundRecords";
import AffiliateCenter from "./componenets/PROFILE/ProfilePopups/AffiliateCenter";
import Settings from "./componenets/PROFILE/ProfilePopups/Settings";
import Invite from "./componenets/INVITATION/InvitePage";
import Record from "./componenets/RECORD/Record";
import Trade from "./componenets/TRADES/Trade";
import Login from "./componenets/LOGIN/login";
import { UserContextProvider } from "./hooks/userContext";
import Persistance from "./hooks/Persistance";
import { Alert } from "./hooks/useAlert";
function App() {
  return (
    <Router>
      <UserContextProvider>
        <Alert>
          <Routes>
            <Route path="login/:id?" element={<Login />} />
            <Route element={<Persistance />}>
              <Route path="" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/withdraw" element={<Withdraw />} />
                <Route path="profile/deposit" element={<Deposit />} />
                <Route path="record" element={<Record />} />
                <Route
                  path="profile/personal_info"
                  element={<PersonalInfo />}
                />
                <Route path="profile/bank_account" element={<BankAccount />} />
                <Route path="profile/fund_records" element={<FundRecords />} />
                <Route
                  path="profile/affiliate_center"
                  element={<AffiliateCenter />}
                />
                <Route path="profile/settings" element={<Settings />} />
                <Route path="invite" element={<Invite />} />
                <Route path="trades" element={<Trade />} />
              </Route>
            </Route>
          </Routes>
        </Alert>
      </UserContextProvider>
    </Router>
  );
}

export default App;
