import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// action creator
import { setAuthToken, fetchProfileData } from '@/actions/user';

// core components
import Header from '@/components/Header';
import BodyStyle from '@/components/BodyStyle';
import NotFoundPage from '@/components/NotFoundPage';
import ProfilePage from '@/components/ProfilePage';
import PasswordForm from '@/components/ProfilePage/PasswordForm';
import ProposalForm from '@/components/ProposalForm';
import ServerErrorPage from '@/components/ServerErrorPage';
import Admin from '@/components/Admin';
import Community from '@/components/Community';
import Home from '@/components/Home';
import AchievementValidation from '@/components/Admin/AchievementValidation';
import UserRole from '@/components/Admin/UserRole';
import Tags from '@/components/Admin/Tags';
import BilanAdeme from '@/components/Home/BilanAdeme';
import MyCreations from '@/components/MyCreations';

// collection component
import Collection from '@/components/Collection';
import AddCard from '@/components/Collection/AddCard';
// Achievement component
import AchievementForm from '@/components/Collection/AchievementForm';
// authentification component
import SignIn from '@/components/Authentification/SignIn';
import SignUp from '@/components/Authentification/SignUp';
// spinner component
import Spinner from '@/components/Spinner';

// Admin components
import ProposalValidation from '@/components/Admin/ProposalValidation';
import FormValidation from '@/components/Admin/ProposalValidation/FormValidation';
import AchievementFormValidation from '@/components/Admin/AchievementValidation/FormValidation';

function App() {
  const { logged, errorStatus, roleId } = useSelector((state) => ({
    logged: state.user.logged,
    roleId: state.user.roleId,
    errorStatus: state.error.errorStatus,
  }));
  const dispatch = useDispatch();
  const [hasTokenSent, setHasTokenSent] = useState(true);
  // checked if user is connected and update token to store
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAuthToken(token));
      dispatch(fetchProfileData());
      setHasTokenSent(false);
    } else {
      setHasTokenSent(false);
    }
  }, []);

  return (
    <div>
      <Header />
      <BodyStyle>
        {hasTokenSent ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/sign-in"
              element={logged ? <Navigate to="/" /> : <SignIn />}
            />
            <Route
              path="/sign-up"
              element={logged ? <Navigate to="/" /> : <SignUp />}
            />
            {logged && <Route path="/profile" element={<ProfilePage />} />}
            {logged && <Route path="/profile/password" element={<PasswordForm />} />}
            {logged && <Route path="/collection" element={<Collection />} />}
            {logged && <Route path="/me/proposal" element={<ProposalForm />} />}
            {logged && <Route path="/me/add-card" element={<AddCard />} />}
            {logged && <Route path="/my-creations" element={<MyCreations />} />}
            {logged && <Route path="/community" element={<Community />} />}
            {logged && <Route path="/me/achievement/:slug" element={<AchievementForm />} />}
            {logged && roleId === 1 && <Route path="/admin/proposals" element={<ProposalValidation />} />}
            {logged && roleId === 1 && <Route path="/admin/tags" element={<Tags />} />}
            {logged && roleId === 1 && <Route path="/admin/proposals/:slug" element={<FormValidation />} />}
            {logged && roleId === 1 && <Route path="/achievement/proposal/:slug" element={<AchievementFormValidation />} />}
            {logged && roleId === 1 && <Route path="/admin/achievements" element={<AchievementValidation />} />}
            {logged && roleId === 1 && <Route path="/admin/user" element={<UserRole />} />}
            {logged && roleId === 1 && <Route path="/admin" element={<Admin />} />}
            <Route path="/500" element={errorStatus === 500 && <ServerErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/home/bilan-ademe" element={<BilanAdeme />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </BodyStyle>
    </div>
  );
}

export default App;
