
import React, { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdShelves } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";

interface Route {
    name: string;
    path: string;
    icon: JSX.Element;
}

const Routes: Route[] = [
    {
        icon: <MdShelves size={54} color='#FFFBF5' />,
        name: "Productos",
        path: "/products"
    },
    {
        icon: <MdAddShoppingCart size={54} color='#FFFBF5' />,
        name: "Ventas",
        path: "/sales"
    },
    {
        icon: <MdLibraryBooks size={54} color='#FFFBF5' />,
        name: "Registros",
        path: "/history"
    },
];

const Home: FC = () => {
    const navigate = useNavigate();

    const handleClick = (path: string) => (event: MouseEvent<HTMLDivElement>) => {
        navigate(path);
    };

    return (
        <main className="h-screen w-screen flex justify-center items-center bg-bg">
            <div className="flex flex-col md:flex-row gap-5">
                {
                    Routes.map((route, index) => (
                        <div
                            key={index}
                            className="w-48 flex flex-col items-center justify-center shadow bg-secondary hover:bg-primary px-16 py-4 cursor-pointer transition duration-150 ease-out hover:ease-in rounded"
                            onClick={handleClick(route.path)}
                        >
                            <div className="px-8 py-4">
                                {route.icon}
                            </div>
                            <h1 className="text-2xl font-bold my-2 text-white">{route.name}</h1>
                        </div>
                    ))
                }
            </div>
        </main>
    );
};

export default Home;