import React from 'react'
import { Link } from 'react-router-dom'

const NavBarCategories = ({dropdownRef, categories, featuredCategories, featuredCategories2, featuredCategories3, featuredCategories4 }) => {
    return (
        <div 
            ref={dropdownRef}
            className="absolute left-0 mt-4 z-50 flex rounded-lg shadow-lg border border-gray-200 transform -translate-x-1/4 flex"
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
    )
}

export default NavBarCategories