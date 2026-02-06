import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import UseGetPosts from "../hooks/UseGetPosts";
import TableSkeleton from "./TableSkeleton";

const Table = () => {
  const containerRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });
  const postsData = UseGetPosts();

  // Entrance Animation
  useGSAP(
    () => {
      gsap.from(".table-row", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  // Hover Effect: Scale Up Current, Scale Down Siblings
  const handleMouseEnter = contextSafe((e) => {
    const rows = gsap.utils.toArray(".table-row");
    const currentRow = e.currentTarget;

    gsap.to(currentRow, {
      scale: 1.02,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
      zIndex: 10,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(
      rows.filter((row) => row !== currentRow),
      {
        scale: 0.98,
        opacity: 0.5,
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
      duration: 0.3,
      ease: "power2.inOut",
    });
  });

  if (postsData.isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className=" py-16 px-8 text-white" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black tracking-tighter">
              Content Hub
            </h2>
            <p className="text-gray-500 font-medium">
              Manage your digital assets and status.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
            + New Post
          </button>
        </header>

        <div className="table-container relative overflow-hidden rounded-3xl border border-white/5 bg-[#121214] shadow-2xl">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.02] text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                <th className="p-6">ID</th>
                <th className="p-6">Content Details</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-center">Top Rate</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.03]">
              {postsData?.data.map((item, idx) => (
                <tr
                  key={item.id}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="table-row group relative transition-colors cursor-pointer"
                >
                  <td className="p-6 text-gray-600 font-mono text-xs">
                    {++idx}
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-semibold group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 self-center animate-pulse ${
                          item.status === "published"
                            ? "bg-emerald-400"
                            : item.status === "draft"
                              ? "bg-amber-400"
                              : "bg-rose-400"
                        }`}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 text-center text-lg leading-none">
                    {item.topRate ? "✨" : "—"}
                  </td>
                  <td className="p-6">
                    <div className="flex justify-end gap-3">
                      <button className=" cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 transition-all">
                        Edit
                      </button>
                      <button className=" cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 transition-all">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
