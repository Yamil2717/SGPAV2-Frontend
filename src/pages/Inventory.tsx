import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import CreateProduct from '../components/products/CreateProduct';
import UpdateProduct from '../components/products/UpdateProduct';
import Axios from 'axios';
import Loading from '../components/Loading';
import { Products, ProductModel } from '../types/Product';
import { MdOutlineDeleteOutline, MdOutlineBrush } from "react-icons/md";
import BgImage from '../assets/bg.jpg';
import ManageCategories from '../components/ManageCategories';

const Inventory = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Products>([]);
    const [isModalOpenCreateProduct, setIsModalOpenCreateProduct] = useState<boolean>(false);
    const [isModalOpenManageCategory, setIsModalOpenManageCategory] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<Products>([]);
    const [isModalOpenEditProduct, setIsModalOpenEditProduct] = useState<boolean>(false);
    const [productToEdit, setProductToEdit] = useState<ProductModel | null>(null);

    useEffect(() => {
        fetchProducts();
    }, [refresh]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await Axios.get<Products>(`${process.env.REACT_APP_URL_API}/Products`);
            setProducts(response.data);
            setFilteredProducts(response.data);
            setTimeout(() => setLoading(false), 500);
        } catch (error) {
            setError('Error al obtener los productos. Algo salió mal.' + error);
            setTimeout(() => setLoading(false), 500);
        }
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );

        setFilteredProducts(filtered);
    };

    const handleAddProduct = () => {
        setIsModalOpenCreateProduct(true);
    };

    const handleCategories = () => {
        setIsModalOpenManageCategory(true);
    };

    const handleEditProduct = (product: ProductModel) => {
        setProductToEdit(product);
        setIsModalOpenEditProduct(true);
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await Axios.delete(`${process.env.REACT_APP_URL_API}/Products/${productId}`);
            setRefresh(true);
        } catch (error) {
            console.error('Error al eliminar el producto: ', error);
        }
    };

    // Si está cargando, muestra el componente Loading
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 ease-in-out">
                <h3 className='text-white text-center font-semibold text-2xl my-8'>{error}</h3>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 ease-in-out">
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder='Buscar producto...'
                    onChange={handleSearch}
                    className="border border-gray-300 rounded px-2 py-1 w-3/5 shadow-lg outline-none mx-auto"
                />
                <button
                    onClick={handleCategories}
                    className="bg-secondary hover:bg-primary font-semibold text-white cursor-pointer transition duration-150 shadow-lg ease-out hover:ease-in rounded px-4 py-2 ml-2 w-1/5"
                >
                    Configurar Categorías
                </button>
                <button
                    onClick={handleAddProduct}
                    className="bg-secondary hover:bg-green-600 font-semibold text-white cursor-pointer transition duration-150 shadow-lg ease-out hover:ease-in rounded px-4 py-2 ml-2 w-1/5"
                >
                    Agregar Producto
                </button>
            </div>
            {
                products.length === 0
                    ? (
                        <h3 className='text-white text-center font-semibold text-2xl my-8'>Lo sentimos no encontramos productos registrados.</h3>
                    )
                    : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                filteredProducts.map((product: ProductModel) => (
                                    <div key={product.id} className="w-full h-64 cursor-pointer">
                                        <div className="relative-card bg-transparent rounded-lg shadow-md w-full h-full transform rotate-y-0 hover:rotate-y-180 transition-transform duration-700">
                                            <div className="absolute-card inset-0 rounded-lg flex items-center justify-center transition-transform duration-700 transform rotate-y-0">
                                                <div className="absolute inset-0" style={{ backgroundImage: `url(${BgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                                <h1 className="text-2xl font-bold text-white z-10 drop-shadow-sm bg-black/50 text-center py-1 w-full">{product.name}</h1>
                                            </div>
                                            <div className="absolute-card inset-0 bg-white rounded-lg flex flex-col transition-transform duration-700 transform rotate-y-180">
                                                <div className="text-2xl text-white bg-primary_dark w-full text-center rounded-t p-2 overflow-hidden whitespace-nowrap text-overflow-ellipsis min-w-0">{product.name}</div>
                                                <div><p className="text-base text-justify bg-primary_dark text-white px-2 pb-2 overflow-hidden whitespace-nowrap text-overflow-ellipsis min-w-0">{product.description}</p></div>
                                                <div className="grid grid-cols-1 gap-2 p-2">
                                                    <div className="flex justify-between text-lg min-w-0">
                                                        <p>Precio:</p>
                                                        <p className="text-slate-950 min-w-0">$ {product.price}</p>
                                                    </div>
                                                    <div className="flex justify-between min-w-0">
                                                        <p >Cantidad disponible:</p>
                                                        <p className="text-slate-950 min-w-0">{product.stock}</p>
                                                    </div>
                                                    <div className="flex justify-between min-w-0">
                                                        <p >Categoría:</p>
                                                        <p className="text-slate-950 min-w-0">{product.category.name}</p>
                                                    </div>
                                                </div>
                                                <div className='mt-auto border-t-2 border-primary text-white flex justify-between items-center p-2'>
                                                    <button onClick={() => handleEditProduct(product)} className="flex justify-center items-center bg-secondary hover:bg-primary rounded cursor-pointer px-2 py-1 gap-1">
                                                        <MdOutlineBrush size={16} />
                                                        <p>Editar</p>
                                                    </button>
                                                    <button onClick={() => handleDeleteProduct(product.id)} className="flex justify-center items-center bg-red-600 hover:bg-red-700 rounded cursor-pointer px-2 py-1 gap-1 outline-none">
                                                        <MdOutlineDeleteOutline size={16} />
                                                        <p>Eliminar</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
            <Modal isOpen={isModalOpenCreateProduct} onClose={() => setIsModalOpenCreateProduct(false)} title="Agregar Producto">
                <CreateProduct onClose={() => setIsModalOpenCreateProduct(false)} setRefresh={setRefresh} />
            </Modal>
            <Modal isOpen={isModalOpenManageCategory} onClose={() => setIsModalOpenManageCategory(false)} title="Configurar Categorías">
                <ManageCategories onClose={() => setIsModalOpenManageCategory(false)} setRefresh={setRefresh} />
            </Modal>
            <Modal isOpen={isModalOpenEditProduct} onClose={() => setIsModalOpenEditProduct(false)} title="Editar Producto">
                {productToEdit && <UpdateProduct product={productToEdit} onClose={() => setIsModalOpenEditProduct(false)} setRefresh={setRefresh} />}
            </Modal>
        </div>
    );
};

export default Inventory;