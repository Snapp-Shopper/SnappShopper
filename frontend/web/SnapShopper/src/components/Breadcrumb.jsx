import React from "react";

const Breadcrumb = () => {
  // return (
  //     <div className="flex items-center space-x-2 text-sm">
  //       <a href="/" className="text-gray-500 hover:text-blue-600">
  //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1"><path d="m12 19-7-7 7-7"/></svg>
  //         Home
  //       </a>
  //       <span className="text-gray-400">/</span>
  //       <span className="font-medium">My Account</span>
  //     </div>
  //   );
  // };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <span className="hover:text-blue-600 cursor-pointer transition-colors">
        Home
      </span>
      <span>/</span>
      <span className="text-blue-600 font-medium">My Account</span>
    </nav>
  );
};

export default Breadcrumb;
