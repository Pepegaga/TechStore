import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as CgIcons from 'react-icons/cg'

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: 'Products',
        path: '/products',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text',
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text',
    },
    {
        title: 'Comments',
        path: '/comments',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text',
    },
    {
        title: 'Users',
        path: '/users',
        icon: <FaIcons.FaUser />,
        cName: 'nav-text',
    },
    {
        title: 'Log out',
        path: '/signin',
        icon: <CgIcons.CgLogOut />,
        cName: 'nav-text',
    },
]
