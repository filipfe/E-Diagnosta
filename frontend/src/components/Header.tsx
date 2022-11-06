import { Link } from "react-router-dom"
import { useResolvedPath, useMatch } from 'react-router'
import { useState } from 'react'

export default function Header() {
    return (
        <header className="flex items-center justify-between h-[6rem] padding sticky top-0">
            <Logo />
            <Nav />
        </header>
    )
}

const Logo = () => <Link to='/'>E-Diagnosta</Link>

const lineStyle = 'h-[3px] w-full bg-primary transition rounded-xl'

const Nav = () => {
    const [active, setActive] = useState(false)
    return (
        <>
            <div className={`flex flex-col md:flex-row justify-center items-center bg-white gap-4 text-sm font-medium absolute top-0 md:relative left-full transition-transform ${active && '-translate-x-full'} md:left-auto h-screen md:h-full w-screen md:w-max`}>
                <CustomLink to='/'>Strona Główna</CustomLink>
                <CustomLink to='/skp'>Nasze Stacje</CustomLink>
                <CustomLink to='/o-nas'>O Nas</CustomLink>
                <Link className="border-[2px] mt-4 md:mt-0 md:ml-4 font-semibold border-primary text-primary rounded flex items-center py-2 px-6" to='/logowanie'>Zaloguj się</Link>
                <Link className="bg-primary border-[2px] transition-colors hover:border-darkPrimary hover:bg-darkPrimary font-semibold border-primary text-white rounded flex items-center py-2 px-6" to='/rejestracja'>Załóż Konto</Link>
            </div>
            <div onClick={() => setActive(prev => !prev)} className='burger flex flex-col relative z-50 sm:hidden h-5 w-8 justify-between cursor-pointer'>
                <div style={active ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(45deg)', maxWidth: '100%'} : { maxWidth: '60%' }} className={lineStyle}></div>
                <div style={active ? {opacity: 0} : {}} className={lineStyle}></div>
                <div style={active ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(-45deg)', maxWidth: '100%'} : { maxWidth: '60%', marginLeft: 'auto'}} className={lineStyle}></div>
            </div>
        </>
    )
}

type CustomLink = {
    children: JSX.Element | string,
    to: string,
    className?: string
}

const CustomLink = ({children, to, className}: CustomLink) => {
    const activePath = useResolvedPath(to)
    const isActive = useMatch({path: `${activePath.pathname}/*`, end: true})
    return <Link to={to} className={`${className && className} transition-colors font-medium ${isActive ? 'text-primary' : 'hover:text-primary'}`}>{children}</Link>
}