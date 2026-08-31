import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPhotos } from "../store/photosSlice";
import PhotoCard from "../components/PhotoCard";
import { ChevronLeft, ChevronRight, AlertTriangle, Image as ImageIcon } from "lucide-react";
import { Photo } from "../services/api";

function Photos() {
  const dispatch = useAppDispatch();

  // 1. Extract Redux state first
  const { items, loading, error } = useAppSelector((state) => state.photos);

  // 2. Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 12 items per page fits standard grid perfectly

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchPhotos());
    }
  }, [dispatch, items.length]);

  // Loading skeleton state
  if (loading) {
    return (
      <div className="space-y-6 py-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-xl w-48"></div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-slate-100 border border-slate-200/60 rounded-2xl overflow-hidden h-72 flex flex-col justify-between">
              <div className="aspect-square bg-slate-200 w-full"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                <div className="h-4 bg-slate-200 rounded-md w-2/3"></div>
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
        <h3 className="text-xl font-bold text-slate-800">Failed to load photos</h3>
        <p className="text-slate-500 mt-1 max-w-sm text-sm">{error || "An unexpected error occurred."}</p>
        <button
          onClick={() => dispatch(fetchPhotos())}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  // 3. Calculate sliced array boundaries
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
          <ImageIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800">Photo Gallery</h1>
          <p className="text-slate-500 text-xs md:text-sm">Browse through high-resolution curated image catalog ({items.length} items)</p>
        </div>
      </div>

      {/* Grid rendering current sliced items */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {currentItems.map((photo: any) => (
          <PhotoCard key={photo.id} photo={photo} />
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

          {/* First Page */}
          {currentPage > 3 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
              >
                1
              </button>
              <span className="px-1 text-slate-400 font-bold">...</span>
            </>
          )}

          {/* Visible Dynamic Page Window */}
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter(
              (page) => page >= currentPage - 2 && page <= currentPage + 2
            )
            .map((pageNum) => (
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
            ))}

          {/* Last Page */}
          {currentPage < totalPages - 2 && (
            <>
              <span className="px-1 text-slate-400 font-bold">...</span>
              <button
                onClick={() => handlePageChange(totalPages)}
                className="w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
              >
                {totalPages}
              </button>
            </>
          )}

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

export default Photos;
