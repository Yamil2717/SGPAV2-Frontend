import React, { FC, useState, useEffect } from 'react';
import Axios from 'axios';
import Loading from '../Loading';
import { Categories } from '../../types/Category';
import { ProductModel } from '../../types/Product'; // Asegúrate de tener este tipo definido
import { useNotification } from '../notification/NotificationContext';

interface UpdateProductProps {
    product: ProductModel;
    onClose: () => void;
    setRefresh: (refresh: boolean) => void;
}

const UpdateProduct: FC<UpdateProductProps> = ({ product, onClose, setRefresh }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [productName, setProductName] = useState<string>(product.name);
    const [productDescription, setProductDescription] = useState<string>(product.description);
    const [productPrice, setProductPrice] = useState<number>(product.price);
    const [productCategory, setProductCategory] = useState<number>(product.category_ID);
    const [productStock, setProductStock] = useState<number>(product.stock);
    const [categories, setCategories] = useState<Categories>([]);
    const [error, setError] = useState<string>('');

    const { showMessage } = useNotification();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await Axios.get<Categories>(`${process.env.REACT_APP_URL_API}/Category`);
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

        const updatedProduct = {
            id: product.id,
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
            await Axios.put(`${process.env.REACT_APP_URL_API}/Products/${product.id}`, updatedProduct);
            setTimeout(() => setLoading(false), 500);
            setTimeout(() => {
                setError('');
                onClose();
                showMessage('Producto actualizado correctamente');
                setRefresh(true);
            }, 750);
        } catch (error) {
            setTimeout(() => setLoading(false), 500);
            setError('Error al actualizar el producto. Por favor, inténtalo de nuevo.');
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

    return (
        <form onSubmit={handleSubmit} className="rounded px-8 pt-6 mb-4">
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                    Nombre del producto
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Nombre del producto"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
                    Descripción del producto
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Descripción del producto"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="price">
                    Precio del producto
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    placeholder="Precio del producto"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="stock">
                    Cantidad del producto
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="stock"
                    type="number"
                    placeholder="Stock del producto"
                    value={productStock}
                    onChange={(e) => setProductStock(Number(e.target.value))}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="category">
                    Categoría del producto
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    value={productCategory}
                    onChange={(e) => setProductCategory(Number(e.target.value))}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center justify-end">
                <button
                    className="bg-bg hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Guardar
                </button>
            </div>
        </form>
    )

};

export default UpdateProduct;