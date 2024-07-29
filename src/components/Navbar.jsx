import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white  flex justify-between px-4 items-center h-14'>
        <div className="logo hover:cursor-pointer font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </div>
        <ul>
            <li className='flex gap-4'>
                <a className="hover:font-bold" href="/">Home</a>
                <a className="hover:font-bold" href="#">About</a>
                <a className="hover:font-bold" href="#">Contact</a>
            </li>
           
        </ul>
    </nav>
  )
}

export default Navbar
