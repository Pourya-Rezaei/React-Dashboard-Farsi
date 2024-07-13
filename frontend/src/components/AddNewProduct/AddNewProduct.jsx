import React, { useState } from 'react'
import "./AddNewProduct.css"

import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

export default function AddNewProduct({ fetchAllProducts }) {
    const [newProductTitle, setNewProductTitle] = useState("")
    const [newProductPrice, setNewProductPrice] = useState("")
    const [newProductCount, setNewProductCount] = useState("")
    const [newProductImg, setNewProductImg] = useState("")
    const [newProductPopularity, setNewProductPopularity] = useState("")
    const [newProductSale, setNewProductSale] = useState("")
    const [newProductColors, setNewProductColors] = useState("")

    const addNewProduct = async (event) => {
        event.preventDefault()
        const newProductInfos = {
            title: newProductTitle,
            price: newProductPrice,
            count: newProductCount,
            img: newProductImg,
            popularity: newProductPopularity,
            sale: newProductSale,
            colors: newProductColors,
        }

        try {
            const response = await fetch(`http://localhost:3000/api/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProductInfos)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            fetchAllProducts()
            emptyInputs()
            console.log(result);

        } catch (error) {
            console.error("Error adding new product:", error);
        }
    }

    function emptyInputs() {
        setNewProductTitle("")
        setNewProductPrice("")
        setNewProductCount("")
        setNewProductImg("")
        setNewProductPopularity("")
        setNewProductSale("")
        setNewProductColors("")
    }
    return (
        <>
            <div className="product-main">
                <h1 className='product-title'>افزودن محصول جدید</h1>
                <form className="add-product__form">
                    <div className="add-product__form-wrap">
                        <div className="add-product-form-group">
                            <input type="text" placeholder='اسم محصول را بنویسید'
                                className='add-product__form-input'
                                value={newProductTitle} onChange={(event) => setNewProductTitle(event.target.value)} />
                            <MdOutlineDriveFileRenameOutline className='add-product__form-icon' />
                        </div>
                        <div className="add-product-form-group">
                            <input type="text" placeholder='قیمت محصول را بنویسید'
                                className='add-product__form-input'
                                value={newProductPrice} onChange={(event) => setNewProductPrice(event.target.value)} />
                            <MdOutlineDriveFileRenameOutline className='add-product__form-icon' />
                        </div>
                        <div className="add-product-form-group">
                            <input type="text" placeholder='موجودی محصول را بنویسید'
                                className='add-product__form-input'
                                value={newProductCount} onChange={(event) => setNewProductCount(event.target.value)} />
                            <MdOutlineDriveFileRenameOutline className='add-product__form-icon' />
                        </div>
                        <div className="add-product-form-group">
                            <input type="text" placeholder='آدرس عکس محصول را بنویسید'
                                className='add-product__form-input'
                                value={newProductImg} onChange={(event) => setNewProductImg(event.target.value)} />
                            <MdOutlineDriveFileRenameOutline className='add-product__form-icon' />
                        </div>
                        <div className="add-product-form-group">
                            <input type="text" placeholder=' میزان محبوبیت محصول را بنویسید'
                                className='add-product__form-input'
                                value={newProductPopularity} onChange={(event) => setNewProductPopularity(event.target.value)} />
                            <MdOutlineDriveFileRenameOutline className='add-product__form-icon' />
                        </div>
                        <div className="add-product-form-group">
                            <input type="text" placeholder=' میزان فروش  محصول را بنویسید'
                                className='add-product__form-input'
                                value={newProductSale} onChange={(event) => setNewProductSale(event.target.value)} />
                            <MdOutlineDriveFileRenameOutline className='add-product__form-icon' />
                        </div>
                        <div className="add-product-form-group">
                            <input type="text" placeholder=' تعداد رنگ بندی   محصول را بنویسید'
                                className='add-product__form-input'
                                value={newProductColors} onChange={(event) => setNewProductColors(event.target.value)} />
                            <MdOutlineDriveFileRenameOutline className='add-product__form-icon' />
                        </div>
                    </div>
                    <button className='add-product__submit' onClick={addNewProduct}>ثبت محصول</button>
                </form>
            </div>
        </>
    )
}
