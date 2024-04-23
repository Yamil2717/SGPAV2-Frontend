import React, { FC } from 'react';

const Header: FC = () => {
    return (
        <header className="bg-bg text-white shadow-lg border-b-2 border-[rgba(255,255,255,0.1)]">
            <div className="container mx-auto py-6 px-4 flex items-center justify-between">
                <a href='/' className='text-2xl font-bold hover:text-primary'>SGPA Inventario</a>
                <nav>
                    <ul className="flex space-x-4 text-base gap-3">
                        <li>
                            <a href="/products" className="hover:text-primary font-semibold transition-colors duration-200">Productos</a>
                        </li>
                        <li>
                            <a href="/sales" className="hover:text-primary font-semibold transition-colors duration-200">Ventas</a>
                        </li>
                        <li>
                            <a href="/logs" className="hover:text-primary font-semibold transition-colors duration-200">Registros</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;