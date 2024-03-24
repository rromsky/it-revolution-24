import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";
import WelcomePage from "./pages/welcome-page";
import AdminPanel from "./pages/admin-panel";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();

  useEffect(() => {
    const unSubscribeFromAuth = onAuthStateChanged(auth, (userInstance) => {
      if (userInstance) {
        setUser(userInstance);
      }
    });
    return () => {
      unSubscribeFromAuth();
    };
  }, []);

  return !!!user ? (
    <WelcomePage user={user} />
  ) : (
    <AdminPanel user={user} setUser={setUser} />
  );
};

export default App;
