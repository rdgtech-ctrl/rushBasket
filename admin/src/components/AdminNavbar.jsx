import React, { useState } from 'react'
import { adminNavbarStyles as styles } from '../assets/adminStyles'
import { FiMenu, FiX, FiPackage, FiPlusCircle, FiShoppingBag } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'


const AdminNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
    const closeMobileMenu = () => setIsMobileMenuOpen(false)

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.mainFlex}>
                    {/* LOGO */}
                    <div className={styles.logoContainer}>
                        <div className={styles.logoIconContainer}>
                            <FiPackage className={styles.logoIcon} />
                        </div>
                        <h1 className={styles.logoText}>
                            <span className={styles.logoAccent}>RushBasket</span> Admin
                        </h1>
                    </div>

                    {/* DESKTOP LINKS */}
                    <div className={styles.desktopNavLinks}>
                        <NavLink 
                            to="/admin/add-item" 
                            className={({isActive}) => styles.navLink({isActive})}
                        >
                            <FiPlusCircle className='mr-2' />
                            Add Products
                        </NavLink>

                        <NavLink 
                            to="/admin/list-items" 
                            className={({isActive}) => styles.navLink({isActive})}
                        >
                            <FiPackage className='mr-2' />
                            List Items
                        </NavLink>

                        <NavLink 
                            to="/admin/orders" 
                            className={({isActive}) => styles.navLink({isActive})}
                        >
                            <FiShoppingBag className='mr-2' />
                            Orders
                        </NavLink>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div>
                        <button onClick={toggleMobileMenu} className={styles.menuButton}>
                            {isMobileMenuOpen ? (
                                <FiX className='h-6 w-6' />
                            ) : (
                                <FiMenu className='h-6 w-6' />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE LINKS - ONLY RENDER WHEN OPEN */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenuInner}>
                    <NavLink 
                        to='/admin/add-item' 
                        onClick={closeMobileMenu} 
                        className={({isActive}) => styles.mobileNavLink({isActive})}
                    >
                        <FiPlusCircle className='mr-3 ml-1' size={20} />
                        Add Products
                    </NavLink>

                    <NavLink 
                        to='/admin/list-items' 
                        onClick={closeMobileMenu} 
                        className={({isActive}) => styles.mobileNavLink({isActive})}
                    >
                        <FiPackage className='mr-3 ml-1' size={20} />
                        List Items
                    </NavLink>

                    <NavLink 
                        to='/admin/orders' 
                        onClick={closeMobileMenu} 
                        className={({isActive}) => styles.mobileNavLink({isActive})}
                    >
                        <FiShoppingBag className='mr-3 ml-1' size={20} />
                        Orders
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default AdminNavbar;