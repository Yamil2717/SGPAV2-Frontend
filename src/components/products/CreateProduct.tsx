import React, { FC, useState, useEffect } from 'react';
import Axios from 'axios';
import Loading from '../Loading';
import { Categories } from '../../types/Category';
import { useNotification } from '../notification/NotificationContext';

interface CreateProductProps {
    onClose: () => void;
    setRefresh: (refresh: boolean) => void;
}

const CreateProduct: FC<CreateProductProps> = ({ onClose, setRefresh }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [productName, setProductName] = useState<string>('');
    const [productDescription, setProductDescription] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productCategory, setProductCategory] = useState<number>(0);
    const [productStock, setProductStock] = useState<number>(0);
    const [categories, setCategories] = useState<Categories>([]);
    const [error, setError] = useState<string>('');

    const { showMessage } = useNotification();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            console.log(process.env.REACT_APP_URL_API);
            const response = await Axios.get<Categories>(`${process.env.REACT_APP_URL_API}/Category`);
            console.info(response.data);
            setCategories(response.data);
            setTimeout(() => setLoading(false), 1000);
        } catch (error) {
            setError('Error al obtener las categorías. Algo salió mal.' + error);
            setTimeout(() => setLoading(false), 1000);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!productName) {
            setError('El nombre del producto es obligatorio.');
            setLoading(false);
            return;
        }

        if (!productDescription) {
            setError('La descripción del producto es obligatoria.');
            setLoading(false);
            return;
        }

        if (productPrice <= 0) {
            setError('El precio del producto debe ser mayor a 0.');
            setLoading(false);
            return;
        }

        if (productCategory === 0) {
            setError('Por favor, selecciona una categoría.');
            setLoading(false);
            return;
        }

        if (productStock < 0) {
            setError('El stock del producto no puede ser negativo.');
            setLoading(false);
            return;
        }

        const product = {
            name: productName,
            description: productDescription,
            price: productPrice,
            stock: productStock,
            category_ID: productCategory,
            category: {
                id: productCategory,
                name: categories.find((category) => category.id === productCategory)?.name || ''
            }
        };

        try {
            await Axios.post(`${process.env.REACT_APP_URL_API}/Products`, product);
            setTimeout(() => setLoading(false), 500);
            setTimeout(() => {
                setProductName('');
                setProductDescription('');
                setProductPrice(0);
                setProductCategory(0);
                setProductStock(0);
                setError('');
                onClose();
                showMessage('Producto creado correctamente');
                setRefresh(true);
            }, 750);
        } catch (error) {
            setTimeout(() => setLoading(false), 500);
            setError('Error al crear el producto. Por favor, inténtalo de nuevo.');
        }

        onClose();
    };

    // Si está cargando, muestra el componente Loading
    if (loading) {
        return <Loading />;
    }

    // Si hay un error y no hay categorías, muestra el mensaje de error
    if (error && categories.length === 0) {
        if (categories.length === 0 && error !== 'Error al obtener las categorías. Algo salió mal.') {
            return <p className="text-red-500 my-4 mx-8 text-center font-semibold text-lg">No hay categorías disponibles</p>;
        }
        return <p className="text-red-500 my-4 mx-8 text-center font-semibold text-lg">{error}</p>;
    }

    // Si no está cargando y no hay error, muestra el formulario
    return (
        <form className="w-full mt-8 px-8" onSubmit={handleSubmit}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-300 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="product-name">
                        Nombre del producto
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                        id="product-name"
                        type="text"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-300 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="product-name">
                        Descripción del producto
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                        id="product-description"
                        type="text"
                        value={productDescription}
                        onChange={(event) => setProductDescription(event.target.value)}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-300 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="product-price">
                        Precio
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                        id="product-price"
                        type="number"
                        value={productPrice}
                        onChange={(event) => setProductPrice(Number(event.target.value))}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-300 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="product-category">
                        Categoría
                    </label>
                </div>
                <div className="md:w-2/3">
                    <select
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                        id="product-category"
                        value={productCategory}
                        onChange={(event) => setProductCategory(Number(event.target.value))}
                    >
                        <option key={0} value={0} defaultValue={0}>Seleccione</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-300 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="product-stock">
                        Cantidad del producto
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                        id="product-stock"
                        type="number"
                        value={productStock}
                        onChange={(event) => setProductStock(Number(event.target.value))}
                    />
                </div>
            </div>
            {
                error && <div className='text-center my-6 bg-red-500 p-2 cursor-default rounded'>
                    <p className="text-white text-center font-bold">{error}</p>
                </div>
            }
            <div className="md:flex md:items-center mb-8">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button
                        className="shadow bg-bg hover:bg-primary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Agregar Producto
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CreateProduct;