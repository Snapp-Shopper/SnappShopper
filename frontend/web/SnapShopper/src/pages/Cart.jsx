import React from 'react'
import CartItems from '../components/Cart/CartItems'
import CartSummary from '../components/Cart/CartSummary'
import ShoppingSecurityInfo from '../components/Cart/ShoppingSecurityInfo'
import PaymentOptions from '../components/Cart/PaymentOptions'
import RecommendedProducts from '../components/Cart/RecommendedProducts'

const Cart = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 container mx-auto px-4 py-4">
                    {/* <Breadcrumb /> */}
                    <div>
                        <h1 className="text-2xl font-semibold mb-6 text-center">Shopping Cart</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <CartItems />
                            </div>
                            <div className="md:col-span-1">
                                <CartSummary />
                                <PaymentOptions />
                                <ShoppingSecurityInfo />
                            </div>
                        </div>
                        <div className="mt-12">
                            <RecommendedProducts />
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Cart