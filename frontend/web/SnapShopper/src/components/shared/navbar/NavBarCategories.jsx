import React from "react";
import { Link } from "react-router-dom";

const NavBarCategories = ({
  dropdownRef,
  categories,
  featuredCategories,
  featuredCategories2,
  featuredCategories3,
  featuredCategories4,
}) => {
 return (
        <>
            {/* Mobile: Full screen modal */}
            <div className="md:hidden">
                <div 
                    ref={dropdownRef}
                    className="fixed inset-0 z-50 bg-white overflow-y-auto"
                >
                    {/* Mobile Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
                        <h2 className="text-lg font-semibold">Categories</h2>
                    </div>

                    {/* Mobile Categories List */}
                    <div className="p-4">
                        <div className="space-y-1">
                            {categories.map((category, index) => (
                                <Link 
                                    key={index}
                                    to={category.link} 
                                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Featured Categories */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4 px-4">Featured Categories</h3>
                            
                            <div className="grid grid-cols-3 gap-4 px-4">
                                {featuredCategories.slice(0, 6).map((category, index) => (
                                    <Link key={index} to={category.link || "#"} className="flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full mb-2 overflow-hidden bg-gray-200 flex items-center justify-center">
                                            <div
                                                className="w-full h-full bg-center bg-cover"
                                                style={{ backgroundImage: `url(${category.image || '/placeholder.jpg'})` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-center leading-tight">{category.name}</span>
                                        {category.subtitle && <span className="text-xs text-center text-gray-500">{category.subtitle}</span>}
                                    </Link>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-4 px-4 mt-4">
                                {featuredCategories2.slice(0, 6).map((category, index) => (
                                    <Link key={index} to={category.link || "#"} className="flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full mb-2 overflow-hidden bg-gray-200 flex items-center justify-center">
                                            <div
                                                className="w-full h-full bg-center bg-cover"
                                                style={{ backgroundImage: `url(${category.image || '/placeholder.jpg'})` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-center leading-tight">{category.name}</span>
                                        {category.subtitle && <span className="text-xs text-center text-gray-500">{category.subtitle}</span>}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop: Original dropdown design */}
            <div className="hidden md:block">
                <div 
                    ref={dropdownRef}
                    className="absolute left-0 mt-4 z-50 flex rounded-lg shadow-lg border border-gray-200 transform -translate-x-1/4"
                >
                    {/* Left sidebar categories */}
                    <div className="w-64 bg-gray-100 rounded-l-lg max-h-[calc(100vh-120px)] overflow-y-auto">
                        <ul className="py-2">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <Link 
                                        to={category.link} 
                                        className="px-4 py-3 flex items-center justify-between hover:bg-gray-200 cursor-pointer block"
                                    >
                                        <span>{category.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Featured categories display */}
                    <div className="w-[700px] bg-white rounded-r-lg p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-6">Featured</h3>
                        <div className="grid grid-cols-5 gap-6">
                            {featuredCategories.map((category, index) => (
                                <Link key={index} to={category.link || "#"} className="flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-full mb-2 overflow-hidden bg-gray-200 flex items-center justify-center">
                                        <div
                                            className="w-full h-full bg-center bg-cover"
                                            style={{ backgroundImage: `url(${category.image || '/placeholder.jpg'})` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-center">{category.name}</span>
                                    {category.subtitle && <span className="text-xs text-center">{category.subtitle}</span>}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 grid grid-cols-5 gap-6">
                            {featuredCategories2.map((category, index) => (
                                <Link key={index} to={category.link || "#"} className="flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-full mb-2 overflow-hidden bg-gray-200 flex items-center justify-center">
                                        <div
                                            className="w-full h-full bg-center bg-cover"
                                            style={{ backgroundImage: `url(${category.image || '/placeholder.jpg'})` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-center">{category.name}</span>
                                    {category.subtitle && <span className="text-xs text-center">{category.subtitle}</span>}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 grid grid-cols-5 gap-6">
                            {featuredCategories3.map((category, index) => (
                                <Link key={index} to={category.link || "#"} className="flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-full mb-2 overflow-hidden bg-gray-200 flex items-center justify-center">
                                        <div
                                            className="w-full h-full bg-center bg-cover"
                                            style={{ backgroundImage: `url(${category.image || '/placeholder.jpg'})` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-center">{category.name}</span>
                                    {category.subtitle && <span className="text-xs text-center">{category.subtitle}</span>}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 grid grid-cols-5 gap-6">
                            {featuredCategories4.map((category, index) => (
                                <Link key={index} to={category.link || "#"} className="flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-full mb-2 overflow-hidden bg-gray-200 flex items-center justify-center">
                                        <div
                                            className="w-full h-full bg-center bg-cover"
                                            style={{ backgroundImage: `url(${category.image || '/placeholder.jpg'})` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-center">{category.name}</span>
                                    {category.subtitle && <span className="text-xs text-center">{category.subtitle}</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBarCategories;
