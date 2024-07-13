import React, { useEffect, useState } from 'react'

import AddNewProduct from '../../components/AddNewProduct/AddNewProduct'
import ProductsTable from '../../components/ProductsTable/ProductsTable'


export default function Products() {
    const [productsData, setProductData] = useState([])
    useEffect(() => {
        fetchAllProducts()
    }, [])
    async function fetchAllProducts() {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setProductData(data);
        console.log(data)
    }
    return (
        <>
            <AddNewProduct fetchAllProducts={fetchAllProducts} />
            <ProductsTable productsData={productsData}
                fetchAllProducts={fetchAllProducts} />
        </>
    )
}
