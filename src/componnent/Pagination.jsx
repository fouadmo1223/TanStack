const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded-lg text-xs font-bold bg-white/5 text-gray-400
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
      >
        Prev
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition
              ${
                page === p
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded-lg text-xs font-bold bg-white/5 text-gray-400
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
