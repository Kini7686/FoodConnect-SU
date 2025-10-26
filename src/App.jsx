import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Browse from './pages/Browse'
import Claim from './pages/Claim'
import Analytics from './pages/Analytics'
import NotFound from './pages/NotFound'
import { auth } from './services/firebase'
import { isAdmin } from './services/roles'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div className="p-6">Loading…</div>;

  const admin = isAdmin(user);

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔒 Login */}
        <Route
          path="/"
          element={user ? <Navigate to="/browse" /> : <Login />}
        />

        {/* 🧑 Regular User Routes */}
        <Route
          path="/browse"
          element={user ? <Browse /> : <Navigate to="/" />}
        />
        <Route
          path="/claim/:id"
          element={user ? <Claim /> : <Navigate to="/" />}
        />

        {/* 🧑‍💼 Admin-Only Routes */}
        {admin && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
          </>
        )}

        {/* ❌ Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
