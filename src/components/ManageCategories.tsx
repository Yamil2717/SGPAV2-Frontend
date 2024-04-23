import React, { FC, useState, useEffect } from 'react';
import Axios from 'axios';
import Loading from './Loading';
import { Categories } from '../types/Category';
import { useNotification } from './notification/NotificationContext';

interface ManageCategoriesProps {
    onClose: () => void;
    setRefresh: (refresh: boolean) => void;
}

const ManageCategories: FC<ManageCategoriesProps> = ({ onClose, setRefresh }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string>('');
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [categories, setCategories] = useState<Categories>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
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

    const handleUpdate = async () => {
        setLoading(true);

        if (!categoryName) {
            setError('El nombre de la categoría es obligatorio.');
            setLoading(false);
            return;
        }

        if (selectedCategory === 0) {
            setError('Por favor, selecciona una categoría.');
            setLoading(false);
            return;
        }

        const category = {
            id: selectedCategory,
            name: categoryName,
        };

        try {
            await Axios.put(`${process.env.REACT_APP_URL_API}/Category/${selectedCategory}`, category);
            setTimeout(() => setLoading(false), 500);
            setTimeout(() => {
                setCategoryName('');
                setSelectedCategory(0);
                setError('');
                onClose();
                showMessage('Categoría actualizada correctamente');
                setRefresh(true);
            }, 750);
        } catch (error) {
            setTimeout(() => setLoading(false), 500);
            setError('Error al actualizar la categoría. Por favor, inténtalo de nuevo.');
        }

        onClose();
    };

    const handleDelete = async () => {
        setLoading(true);

        if (selectedCategory === 0) {
            setError('Por favor, selecciona una categoría.');
            setLoading(false);
            return;
        }

        try {
            await Axios.delete(`${process.env.REACT_APP_URL_API}/Category/${selectedCategory}`);
            setTimeout(() => setLoading(false), 500);
            setTimeout(() => {
                setCategoryName('');
                setSelectedCategory(0);
                setError('');
                onClose();
                showMessage('Categoría eliminada correctamente');
                setRefresh(true);
            }, 750);
        } catch (error) {
            setTimeout(() => setLoading(false), 500);
            setError('Error al eliminar la categoría. Por favor, inténtalo de nuevo.');
        }

        onClose();
    };

    const handleCreate = async () => {
        setLoading(true);

        if (!newCategoryName) {
            setError('El nombre de la categoría es obligatorio.');
            setLoading(false);
            return;
        }

        const category = {
            name: newCategoryName,
        };

        try {
            await Axios.post(`${process.env.REACT_APP_URL_API}/Category`, category);
            setTimeout(() => setLoading(false), 500);
            setTimeout(() => {
                setNewCategoryName('');
                setSelectedCategory(0);
                setError('');
                onClose();
                showMessage('Categoría creada correctamente');
                setRefresh(true);
            }, 750);
        } catch (error) {
            setTimeout(() => setLoading(false), 500);
            setError('Error al crear la categoría. Por favor, inténtalo de nuevo.');
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
        <div className="px-6 py-2">
            {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between bg-gray-100 p-4 my-2 rounded">
                    <p className="text-base font-semibold">{category.name}</p>
                    <div>
                        <button
                            onClick={() => {
                                setSelectedCategory(category.id);
                                setCategoryName(category.name);
                            }}
                            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => {
                                setSelectedCategory(category.id);
                                handleDelete();
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
            {selectedCategory !== 0 && (
                <div className="mt-6 py-2 border-y-2 border-primary">
                    <h2 className="text-xl font-bold mb-2 text-white text-center">Editar Categoría</h2>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <button onClick={handleUpdate} className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-700">Guardar</button>
                </div>
            )}
            <div className="mt-4 mb-6">
                <h2 className="text-lg font-bold mb-2 text-white text-center">Crear Categoría</h2>
                <input
                    type="text"
                    value={newCategoryName}
                    placeholder='Nombre de la categoría...'
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button onClick={handleCreate} className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-700">Crear Categoría</button>
            </div>
        </div>
    )
};

export default ManageCategories;