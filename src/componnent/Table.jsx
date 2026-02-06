import { useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import UseGetPosts from "../hooks/UseGetPosts";
import TableSkeleton from "./TableSkeleton";
import Search from "./Search";

const STATUSES = ["all", "published", "draft", "block"];

const Table = () => {
  const containerRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState(""); // ✅ added

  // Memoize search to prevent effect loops
  const handleSearch = useCallback((val) => {
    setSearch(val);
  }, []);

  const postsData = UseGetPosts(statusFilter, search); // ✅ updated

  // Entrance animation (re-run on filter + search change)
  useGSAP(
    () => {
      gsap.from(".table-row", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [statusFilter, search] }, // ✅ updated
  );

  // Hover animations
  const handleMouseEnter = contextSafe((e) => {
    const rows = gsap.utils.toArray(".table-row");
    const current = e.currentTarget;

    gsap.to(current, {
      scale: 1.02,
      backgroundColor: "rgba(255,255,255,0.05)",
      boxShadow: "0 12px 35px -15px rgba(0,0,0,0.6)",
      zIndex: 10,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(
      rows.filter((row) => row !== current),
      {
        scale: 0.97,
        opacity: 0.45,
        filter: "blur(1px)",
        duration: 0.3,
        ease: "power2.out",
      },
    );
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(".table-row", {
      scale: 1,
      opacity: 1,
      backgroundColor: "transparent",
      filter: "blur(0px)",
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.inOut",
    });
  });

  if (postsData.isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div ref={containerRef} className="py-16 px-8 text-white w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black tracking-tight">Content Hub</h2>
            <p className="text-gray-500 font-medium">
              Manage your digital assets and status.
            </p>

            {/* Filter */}
            <div className="flex gap-2 mt-4">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition
                    ${
                      statusFilter === status
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }
                  `}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ wired search */}
          <Search onSearch={handleSearch} />

          <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
            + New Post
          </button>
        </header>

        {/* Table */}
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#121214] shadow-2xl">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.02] text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                <th className="p-6">#</th>
                <th className="p-6">Content</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-center">Top Rate</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.03]">
              {postsData?.data?.map((item, idx) => (
                <tr
                  key={item.id}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="table-row group relative cursor-pointer transition-colors"
                >
                  <td className="p-6 text-gray-600 font-mono text-xs">
                    {idx + 1}
                  </td>

                  <td className="p-6">
                    <div className="text-sm font-semibold group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="flex justify-center items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 animate-pulse
                          ${
                            item.status === "published"
                              ? "bg-emerald-400"
                              : item.status === "draft"
                                ? "bg-amber-400"
                                : "bg-rose-400"
                          }
                        `}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {item.status}
                      </span>
                    </div>
                  </td>

                  <td className="p-6 text-center text-lg">
                    {item.topRate ? "✨" : "—"}
                  </td>

                  <td className="p-6">
                    <div className="flex justify-end gap-3">
                      <button className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 transition">
                        Edit
                      </button>
                      <button className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {postsData?.data?.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-500">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
