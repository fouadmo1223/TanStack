import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const TableSkeleton = () => {
  const skeletonRef = useRef(null);

  useGSAP(
    () => {
      // Shimmer effect for all skeleton blocks
      gsap.to(".skeleton-block", {
        opacity: 0.4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.05,
        ease: "power1.inOut",
      });
    },
    { scope: skeletonRef },
  );

  return (
    <div className="py-16 px-8 text-white " ref={skeletonRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <header className="mb-10">
          <div className="h-10 w-48 bg-white/10 rounded-lg skeleton-block mb-3" />
          <div className="h-4 w-64 bg-white/5 rounded-md skeleton-block" />
        </header>

        {/* Table Skeleton */}
        <div className="rounded-3xl border border-white/5 bg-[#121214] overflow-hidden">
          <div className="h-14 bg-white/[0.02] border-b border-white/5" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center p-6 border-b border-white/[0.03]"
            >
              <div className="w-12 h-4 bg-white/5 rounded skeleton-block mr-8" />
              <div className="flex-1 h-4 bg-white/5 rounded skeleton-block mr-8" />
              <div className="w-24 h-6 bg-white/5 rounded-full skeleton-block mr-8" />
              <div className="w-12 h-4 bg-white/5 rounded skeleton-block mr-8" />
              <div className="w-24 h-8 bg-white/5 rounded-xl skeleton-block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
