import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postsSlice";
import PostCard from "../components/PostCard";
import { ChevronLeft, ChevronRight, Loader2, AlertTriangle, FileText } from "lucide-react";

function Posts() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.posts);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 12 fits better in standard grid than 20

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchPosts());
    }
  }, [dispatch, items.length]);

  // Loading skeleton state
  if (loading) {
    return (
      <div className="space-y-6 py-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-xl w-48"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-slate-100 border border-slate-200/60 p-6 rounded-2xl h-44 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded-md w-24"></div>
                <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded-md w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4 border border-red-100 shadow-sm shadow-red-500/5">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Failed to load posts</h3>
        <p className="text-slate-500 mt-1 max-w-sm text-sm">{error || "An unexpected error occurred."}</p>
        <button
          onClick={() => dispatch(fetchPosts())}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Calculate slice boundaries
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800">Posts Feed</h1>
          <p className="text-slate-500 text-xs md:text-sm">Explore user-submitted discussions and articles ({items.length} items)</p>
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentItems.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 py-6 border-t border-slate-200/50">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-slate-900 transition shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-xl transition ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-slate-900 transition shadow-sm cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Posts;