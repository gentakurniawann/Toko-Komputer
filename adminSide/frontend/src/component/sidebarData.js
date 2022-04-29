import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'

    },
    {
        title: 'customer',
        path: '/customer',
        icon: <FaIcons.FaUsers/>,
        cName: 'nav-text'

    },
    {
        title: 'admin',
        path: '/admin',
        icon: <FaIcons.FaUserTie/>,
        cName: 'nav-text'

    },
    {
        title: 'Products',
        path: '/product',
        icon: <FaIcons.FaDesktop/>,
        cName: 'nav-text'

    },  
    {
        title: 'Transaksi',
        path: '/transaksi',
        icon: <FaIcons.FaShoppingCart/>,
        cName: 'nav-text'

    }
]