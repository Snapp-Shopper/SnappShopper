import React from 'react'
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
import ProductCard from './ProductCard';

const ProductSection = ({ title, subtitle }) => {

    const { isLoading, setIsLoading } = useLoading();

    // Mock data for products
    const products = [
        {
            id: 1,
            title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
            category: "Women's Clothing",
            size: "M",
            color: "Beige",
            rating: 4,
            reviews: 230,
            originalPrice: 60.00,
            salePrice: 35.50,
            sale: true,
            image: "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg"
        },
        {
            id: 2,
            title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
            category: "Women's Clothing",
            size: "L",
            color: "Black",
            rating: 5,
            reviews: 180,
            originalPrice: 60.00,
            salePrice: 35.50,
            sale: true,
            image: "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg"
        },
        {
            id: 3,
            title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
            category: "Women's Clothing",
            size: "S",
            color: "Pink",
            rating: 4,
            reviews: 150,
            originalPrice: 60.00,
            salePrice: 35.50,
            sale: true,
            image: "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg"
        },
        {
            id: 4,
            title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
            category: "Women's Clothing",
            size: "XS",
            color: "Black",
            rating: 5,
            reviews: 320,
            originalPrice: 60.00,
            salePrice: 35.50,
            sale: true,
            image: "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg"
        },
        {
            id: 5,
            title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
            category: "Women's Clothing",
            size: "XL",
            color: "Pink",
            rating: 4,
            reviews: 205,
            originalPrice: 60.00,
            salePrice: 35.50,
            sale: true,
            image: "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg"
        }
    ];

    // Duplicate for second row
    const productsRow2 = products.map(p => ({ ...p, id: p.id + 100 }));

    return (
        <div className="py-8 bg-zinc-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">

                        <h2 className="text-2xl font-semibold text-zinc-800">{title}</h2>
                        <Link href="#" className="text-sm text-zinc-600 hover:text-zinc-800 flex items-center underline">
                            View more
                            <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>

                    </div>

                    {/* {subtitle && <p className="text-zinc-600">{subtitle}</p>} */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {productsRow2.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSection