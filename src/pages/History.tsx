import React, { FC, useEffect, useState } from 'react';
import { Sale, SaleHistory } from '../types/Sales';
import Axios from 'axios';

const History: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sales, setSales] = useState<Array<Sale>>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchSales();
    }, []);

    const parseSalesData = (data: any): Sale[] => {
        const seenIds: { [key: string]: boolean } = {};
        return (data.$values
            .filter((sale: any) => {
                if (seenIds[sale.id]) {
                    return false;
                } else {
                    seenIds[sale.id] = true;
                    return true;
                }
            })
            .map((sale: any) => {
                return {
                    id: sale.id,
                    client: sale.client,
                    saleDetails: sale.saleDetails.$values.map((detail: any) => {
                        return {
                            id: detail.id,
                            productID: detail.productID,
                            product: detail.product,
                            saleID: detail.saleID,
                            quantity: detail.quantity,
                            unitPrice: detail.unitPrice,
                        };
                    }),
                    total: sale.total,
                    date: sale.date,
                };
            })) as Sale[];
    };

    const fetchSales = async () => {
        setLoading(true);
        try {
            const response = await Axios.get(`${process.env.REACT_APP_URL_API}/Sales`);
            const parsedData = parseSalesData(response.data);
            console.log(parsedData);
            setSales(parsedData);
            setTimeout(() => setLoading(false), 500);
        } catch (error) {
            setError('Error al obtener las ventas. Algo salió mal.' + error);
            setTimeout(() => setLoading(false), 500);
        }
    };


    return (
        <div className="flex flex-col container mx-auto py-8">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-secondary">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        ID de venta
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Detalles de venta
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Fecha
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sales.map((sale) => (
                                    <tr key={sale.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{sale.id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{sale.client}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {sale.saleDetails.map((detail) => (
                                                <div key={detail.id} className="text-sm text-gray-500">
                                                    <p>Producto: {detail.product.name}</p>
                                                    <p>Cantidad: {detail.quantity}</p>
                                                    <p>Precio unitario: {detail.unitPrice}</p>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{sale.total}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{new Date(sale.date).toLocaleDateString()}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;