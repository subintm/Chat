import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FileText, Image, ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="space-y-8 py-4">
      {/* Header / Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-blue-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dashboard Hub</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome back, <span className="capitalize">{user}</span>!
          </h1>
          <p className="text-blue-100 max-w-xl text-sm md:text-base leading-relaxed">
            Monitor, explore, and manage your custom datasets. Toggle between view feeds below to fetch real-time posts or explore high-definition photo assets.
          </p>
        </div>
      </div>

      {/* Grid of Navigation Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Posts Card */}
        <Link
          to="/posts"
          className="group glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-between h-48 relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Feed</span>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              Read Posts
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Browse through user discussions, blog articles, and feed logs.
            </p>
          </div>
          <div className="absolute bottom-6 right-6 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1.5 transition-all">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>

        {/* Photos Card */}
        <Link
          to="/photos"
          className="group glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-between h-48 relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <Image className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gallery</span>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              Explore Photos
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Browse high-resolution imagery assets in a modern fluid grid layout.
            </p>
          </div>
          <div className="absolute bottom-6 right-6 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1.5 transition-all">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;