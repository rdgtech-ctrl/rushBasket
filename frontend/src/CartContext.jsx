import React, { createContext, useContext, useEffect, useState } from 'react'

// Create Context
const CartContext = createContext()
// Creates a context to share cart data across components.

// A wrapper component CartProvider that provides cart data to child components.
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart')
            return savedCart ? JSON.parse(savedCart) : []
        } catch (error) {
            return []
        }
    })
    // IT WILL SAVE THE CART IN LOCAL STORAGE with item id else it will be empty array

    // sync cart to localstorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // ADD AN ITEM TO CART OR INCREASE
    const addToCart = (item, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(ci => ci.id === item.id)
            if (existingItem) {
                return prevCart.map(ci =>
                    ci.id === item.id
                        ? { ...ci, quantity: ci.quantity + quantity } : ci
                )
            }
            else {
                return [...prevCart, { ...item, quantity }]
            }
        })
    }

    // REMOVE ITEM FROM CART
    const removeFromCart = itemId => {
        setCart(prevCart => prevCart.filter(ci => ci.id !== itemId))
    }
    // ci => ci.id !== itemId  keeps item where id is NOT equal to itemId

    // UPDATE ITEM QUANTITY
    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prevCart =>
            prevCart.map(ci =>
                ci.id === itemId ? { ...ci, quantity: newQuantity } : ci
            )
        )
    }

    // CLEAR CART
    const clearCart = () => {
        setCart([])
    }

    // CALCULATE TOTAL COST
    const getCartTotal = () => cart.reduce((total, ci) => total + ci.price * ci.quantity, 0)

    // CALCULATE TOTAL NUMBER OF ITEMS IN CART
    const cartCount = cart.reduce((count, ci) => count + ci.quantity, 0)

    return(
        <CartContext.Provider value={{
            cart,
            cartCount,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    )
}

// CUSTOM HOOK FOR CART CONTEXT
export const useCart = () => {
    const context = useContext(CartContext)
    if(!context){
        throw new Error('USECART MUST BE USED WITHIN A CARTPROVIDER')
    }
    return context
}