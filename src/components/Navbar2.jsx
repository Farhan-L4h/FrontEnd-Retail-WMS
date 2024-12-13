// import React from "react";
// import User from "../assets/image/user.png";
// import Logo from "../assets/image/logo.png";
// import { useAuth } from "../context/AuthContex";

// export default function Navbar2() {
//   const { logout } = useAuth();

//   return (
//     <nav
//       class="bg-white border-gray-200"
//       style={{ backgroundColor: "#394867" }}
//     >
//       <div class="flex flex-wrap items-center justify-between mx-auto p-4">
//         <div className="flex">
//           <a
//             href="/dashboard"
//             class="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <img src={Logo} class="h-8" alt="Flowbite Logo" />
//             <span class="self-center text-white text-2xl font-semibold whitespace-nowrap">
//               Retail
//             </span>
//           </a>
//           {/* <div className="relative hidden md:block">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <svg
//                 className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                 />
//               </svg>
//               <span className="sr-only">Search icon</span>
//             </div>
//             <input
//               type="text"
//               id="search-navbar"
//               className="ms-2 block w-full p-2 pl-10 text-sm text-gray-600 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-50"
//               placeholder="Search..."
//             />
//           </div> */}
//         </div>
//         <button
//           id="dropdownUserAvatarButton"
//           data-dropdown-toggle="dropdownAvatar"
//           class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//           type="button"
//         >
//           <span class="sr-only">Open user menu</span>

//           <img
//             class="w-8 h-8 rounded-full"
//             src={User}
//             alt="user photo"
//           />
//         </button>

//         <div
//           id="dropdownAvatar"
//           class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
//         >
//           <ul
//             class="py-2 text-sm text-gray-700 dark:text-gray-200"
//             aria-labelledby="dropdownUserAvatarButton"
//           >
//             <li>
//               <button
//                 onClick={() => {
//                   if (window.confirm('Are you sure you want to logout?')) {
//                     logout();
//                   }
//                 }}
//                 class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//               >
//                 Logout
//               </button>
//             </li>
//             </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }


import React from "react";
import User from "../assets/image/user.png";
import Logo from "../assets/image/logo.png";
import { useAuth } from "../context/AuthContex";

export default function Navbar2() {
  const { logout, user } = useAuth(); // Mengambil data user dari context

  return (
    <nav
      className="bg-white border-gray-200"
      style={{ backgroundColor: "#394867" }}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex">
          <a
            href="/dashboard"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-white text-2xl font-semibold whitespace-nowrap">
              Retail
            </span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          {/* Menampilkan username di sebelah kiri foto pengguna */}
          <span className="text-black text-sm font-bold bg-white text-gray-800 px-3 py-0.5 rounded border border-gray-300">
            {user?.username || "Guest"}
          </span>
          <button
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={User}
              alt="user photo"
            />
          </button>

          <div
            id="dropdownAvatar"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownUserAvatarButton"
            >
              <li>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to logout?")) {
                      logout();
                    }
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
