import { Link, useLocation } from "react-router-dom";
import { FaRegBookmark, FaUsers, FaFileAlt } from "react-icons/fa";
import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdCategory, MdOutlinePrivacyTip } from "react-icons/md";
import { SlArrowDown, SlBadge } from "react-icons/sl";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useState } from "react";
import logo from "../../assets/navLogo.png";
import { RxDashboard } from "react-icons/rx";
import { FaCalendarDays } from "react-icons/fa6"; // Kept if you need it later
import { GiProgression } from "react-icons/gi";
import { TbLogs } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/feature/auth/authSlice";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  const routes = [
    { path: "/", label: "Dashboard", icon: <RxDashboard className="w-5 h-5" /> },
    { path: "/userManagement", label: "User", icon: <FaUsers className="w-5 h-5" /> },
    { path: "/membership", label: "Membership", icon: <SlBadge className="w-5 h-5" /> },
    { path: "/docVerify", label: "Doc Verification", icon: <GiProgression className="w-5 h-5" /> },
    { path: "/categories", label: "Categories", icon: <MdCategory className="w-5 h-5" /> },
    { path: "/blogs", label: "Blogs", icon: <TbLogs className="w-5 h-5" /> },
    { path: "/feedback", label: "Feedback", icon: <VscFeedback className="w-5 h-5" /> },
  ];

  const settingsRoutes = [
    { path: "/setting/updateProfile", label: "Profile", icon: <IoMdInformationCircleOutline className="w-5 h-5 text-lg" /> },
    { path: "/setting/privacy", label: "Privacy Policy", icon: <MdOutlinePrivacyTip className="w-5 h-5 text-lg" /> },
    { path: "/setting/terms", label: "Terms and Condition", icon: <FaRegBookmark className="w-5 h-5 text-lg" /> },
  ];

  const cmsRoutes = [
    { path: "/cms/home", label: "Home", icon: <RxDashboard className="w-5 h-5" /> },
    { path: "/cms/about", label: "About", icon: <FaUsers className="w-5 h-5" /> },
    { path: "/cms/contact", label: "Contact", icon: <VscFeedback className="w-5 h-5" /> },
    { path: "/cms/global", label: "Global Settings", icon: <IoMdSettings className="w-5 h-5" /> },
  ];

  const isActive = (path) => {
    if (path === '/') return currentPath === path;
    return currentPath.startsWith(path);
  };

  const isSettingsActive = currentPath.startsWith("/setting");
  const isCMSActive = currentPath.startsWith("/cms");

  const toggleSettingsDropdown = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleCMSDropdown = () => setIsCMSOpen(!isCMSOpen);

  return (
    <>
      {/* Mobile Overlay Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#FFFFFF] text-black w-[75%] sm:w-[60%] md:w-[320px] lg:w-[280px] xl:w-[300px] h-screen lg:h-[calc(100vh-40px)] transition-transform duration-300 ease-in-out font-title 
        lg:static lg:m-5 lg:rounded-xl lg:border-2 lg:shadow-2xl lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Header (Logo & Close Button) */}
        <div className="flex justify-center items-center relative py-6 shrink-0">
          <img src={logo} className="w-40 sm:w-44" alt="Logo" />
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 lg:hidden text-black focus:outline-none p-2 rounded-full hover:bg-gray-100"
          >
            <IoCloseSharp className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto px-5 custom-scrollbar">
          <ul className="text-sm">
            {routes.map(({ path, label, icon }) => (
              <Link to={path} key={path}>
                <li
                  className={`flex items-center gap-3 mt-2 px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${
                    isActive(path) ? "bg-[#1D69E1] text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {icon}
                  <p className="text-base font-medium">{label}</p>
                </li>
              </Link>
            ))}

            {/* Settings Dropdown */}
            <div className="mt-2">
              <button
                onClick={toggleSettingsDropdown}
                className={`flex w-full justify-between items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${
                  isSettingsActive ? "bg-[#1D69E1] text-white" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IoMdSettings className="w-5 h-5" />
                  <p className="text-base font-medium">Settings</p>
                </div>
                <SlArrowDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isSettingsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {/* Settings Submenu */}
              {isSettingsOpen && (
                <ul className="pl-6 mt-1 space-y-1">
                  {settingsRoutes.map(({ path, label, icon }) => (
                    <Link to={path} key={path}>
                      <li
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out ${
                          isActive(path) ? "bg-[#164FA9] text-white" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {icon}
                        <p className="text-sm">{label}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>

            {/* CMS Dropdown */}
            <div className="mt-2 mb-4">
              <button
                onClick={toggleCMSDropdown}
                className={`flex w-full justify-between items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${
                  isCMSActive ? "bg-[#1D69E1] text-white" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaFileAlt className="w-5 h-5" />
                  <p className="text-base font-medium">CMS</p>
                </div>
                <SlArrowDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isCMSOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* CMS Submenu */}
              {isCMSOpen && (
                <ul className="pl-6 mt-1 space-y-1">
                  {cmsRoutes.map(({ path, label, icon }) => (
                    <Link to={path} key={path}>
                      <li
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out ${
                          isActive(path) ? "bg-[#164FA9] text-white" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {icon}
                        <p className="text-sm">{label}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </ul>
        </div>

        {/* Footer / Logout Button (Always stays at bottom) */}
        <div className="shrink-0 px-5 py-5 border-t border-gray-200 mt-auto">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 border border-red-600 rounded-xl hover:bg-red-50 transition duration-200"
            >
              <RiLogoutCircleLine className="w-6 h-6 text-red-600 rotate-90" />
              <span className="text-lg font-bold text-red-600">Logout</span>
            </button>
          ) : (
            <Link to="/sign-in" className="block">
              <button className="flex items-center justify-center w-full py-3 border-2 border-black text-black rounded-xl hover:bg-black hover:text-white transition duration-200">
                <span className="text-lg font-bold">Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;