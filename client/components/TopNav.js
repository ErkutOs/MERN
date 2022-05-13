import { useState, useEffect } from 'react'
import { Menu } from 'antd'
import Link from 'next/link'
import { AppstoreOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'

const { Item } = Menu

const TopNav = () => {
    const [currentState, setCurrentState] = useState("")

    useEffect(() => {
        process.browser && setCurrentState(window.location.pathname)
    }, [process.browser && window.location.pathname])

    return (
        <Menu mode="horizontal" selectedKeys={[currentState]}>
            <Item 
                key='/' 
                onClick={e => setCurrentState(e.key)} 
                icon={<AppstoreOutlined/>}
            >
                <Link href='/'>
                    <a>Home</a>
                </Link>
            </Item>
            <Item 
                key='/login' 
                onClick={e => setCurrentState(e.key)} 
                icon={<LoginOutlined/>}
            >
                <Link href='/login'>
                    <a>Login</a>
                </Link>
            </Item>
            <Item 
                key='/register' 
                onClick={e => setCurrentState(e.key)} 
                icon={<UserAddOutlined/>}
            >
                <Link href='/register'>
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>
    )
}

export default TopNav