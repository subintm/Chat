import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../store/authSlice";
import { Home as HomeIcon, FileText, Image as ImageIcon, LogOut, UserCircle } from "lucide-react";

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-50 text-blue-600 border border-blue-100 transition-all"
      : "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent transition-all";

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo/User Display */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/10">
            <UserCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Logged in as</p>
            <h1 className="text-sm font-bold text-slate-800 capitalize leading-tight">
              {user || "Guest"}
            </h1>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/posts" className={linkClass}>
            <FileText className="w-4 h-4" />
            <span>Posts</span>
          </NavLink>

          <NavLink to="/photos" className={linkClass}>
            <ImageIcon className="w-4 h-4" />
            <span>Photos</span>
          </NavLink>

          <div className="w-px h-6 bg-slate-200 mx-2"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-4 py-2 text-sm font-semibold rounded-xl transition-all shadow-sm shadow-red-500/5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
