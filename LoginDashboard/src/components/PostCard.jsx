import { MessageSquare } from "lucide-react";

function PostCard({ post }) {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-full hover:border-blue-200">
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Post #{post.id}</span>
        </div>

        <h2 className="font-bold text-slate-800 text-lg mt-3 capitalize line-clamp-2 group-hover:text-blue-600 leading-snug">
          {post.title}
        </h2>

        <p className="text-slate-500 text-sm mt-3 line-clamp-4 leading-relaxed">
          {post.body}
        </p>
      </div>
    </div>
  );
}

export default PostCard;