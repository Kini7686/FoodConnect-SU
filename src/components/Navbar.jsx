// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { isAdmin } from "../services/roles"; // ✅ make sure this file exists

export default function Navbar() {
  const [user] = useAuthState(auth);
  const admin = isAdmin(user);

  return (
    <nav className="w-full bg-orange-500 text-white px-4 py-3 flex items-center justify-between">
      {/* App title / logo */}
      <Link to="/" className="font-extrabold tracking-wider">
        FoodConnectSU
      </Link>

      {/* Right-side navigation links */}
      <div className="flex items-center gap-3">
        {/* Visible to everyone */}
        <Link to="/browse" className="hover:underline">
          Browse
        </Link>

        {/* Admin-only links */}
        {admin && (
          <>
            <Link to="/dashboard" className="hover:underline">
              Post Surplus
            </Link>
            <Link to="/analytics" className="hover:underline">
              Analytics
            </Link>
          </>
        )}

        {/* Logout button */}
        <button
          onClick={() => signOut(auth)}
          className="bg-white text-orange-600 px-3 py-1 rounded font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
