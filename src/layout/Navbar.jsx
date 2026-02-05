import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Create", path: "/create" },
  ];

  // We only need one ref for the parent container
  const containerRef = useRef();

  useGSAP(
    () => {
      // GSAP looks for '.nav-item' specifically INSIDE containerRef
      gsap.from(".nav-item", {
        x: -80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }, // This ensures GSAP only animates items in this navbar
  );

  // Added 'nav-item' to the class string for GSAP to target
  const linkClass = ({ isActive }) =>
    `nav-item px-4 py-2 text-sm font-medium relative transition-colors duration-300 
     ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"}`;

  return (
    <nav className="w-full bg-white shadow-sm">
      <div ref={containerRef} className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center h-16 items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
