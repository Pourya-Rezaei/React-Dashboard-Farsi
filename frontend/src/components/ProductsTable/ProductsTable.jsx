import React, { useState, useEffect } from 'react'
import "./ProductsTable.css"
import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'
import { AiOutlineDollar } from "react-icons/ai";
import ErrorBox from '../../components/ErrorBox/ErrorBox'

export default function ProductsTable({ productsData, fetchAllProducts }) {
    const [isShowDeleteModal, setIshowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIshowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)


    const [productID, setProductID] = useState(null)

    const [mainProductInfos, setMainProductInfos] = useState({})


    const [newProductTitle, setNewProductTitle] = useState("")
    const [newProductPrice, setNewProductPrice] = useState("")
    const [newProductCount, setNewProductCount] = useState("")
    const [newProductImg, setNewProductImg] = useState("")
    const [newProductPopularity, setNewProductPopularity] = useState("")
    const [newProductSale, setNewProductSale] = useState("")
    const [newProductColors, setNewProductColors] = useState("")


    const deleteModalCancleAction = () => {
        console.log("مودال بسته شد")
        setIshowDeleteModal(false)

    }
    const deleteModalAcceptAction = async () => {
        try {
            console.log("Deleting product with ID:", productID);

            const response = await fetch(`http://localhost:3000/api/products/${productID}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Delete result:", result);

            await fetchAllProducts();
            setIshowDeleteModal(false);
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    }

    const closeDetailsModal = () => {
        setIshowDetailsModal(false)
    }


    const updateProductInfos = async (event) => {
        event.preventDefault();
        const productsNewInfos = {
            title: newProductTitle,
            price: newProductPrice,
            count: newProductCount,
            img: newProductImg,
            popularity: newProductPopularity,
            sale: newProductSale,
            colors: newProductColors,
        }

        try {
            const response = await fetch(`http://localhost:3000/api/products/${productID}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productsNewInfos)
            });
            const result = await response.json();
            console.log(result);
            fetchAllProducts();
            setIsShowEditModal(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }
    return (
        <>
            {
                productsData.length ? (
                    <table className="products-table">
                        <thead>

                            <tr className="products-table__heading-tr">
                                <th>عکس محصول</th>
                                <th>نام محصول</th>
                                <th>قیمت محصول</th>
                                <th>موجودی محصول</th>
                            </tr>

                        </thead>
                        <tbody>
                            {productsData.map(product => (
                                <tr className='products-table__tr' key={product.id}>
                                    <td>
                                        <img src={product.img} alt={`img -${product.title}`} className='products-table__img' />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.price.toLocaleString()} تومان</td>
                                    <td>{product.count} تعداد</td>
                                    <td>
                                        <button className="product-table__btn" onClick={() => {
                                            setIshowDetailsModal(true)
                                            setMainProductInfos(product)
                                        }}>
                                            جزییات
                                        </button>
                                        <button className="product-table__btn"
                                            onClick={() => {
                                                setIshowDeleteModal(true)
                                                setProductID(product.id)
                                            }}>
                                            حذف
                                        </button>
                                        <button className="product-table__btn"
                                            onClick={() => {
                                                setIsShowEditModal(true)
                                                setProductID(product.id)
                                                setNewProductTitle(product.title)
                                                setNewProductPrice(product.price)
                                                setNewProductCount(product.count)
                                                setNewProductImg(product.img)
                                                setNewProductPopularity(product.popularity)
                                                setNewProductSale(product.sale)
                                                setNewProductColors(product.colors)
                                            }}>
                                            ویرایش
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                ) : <ErrorBox msg={"هیچ محصولی یافت نشد"} />
            }

            {isShowDeleteModal &&
                <DeleteModal
                    submit={deleteModalAcceptAction}
                    cancel={deleteModalCancleAction}
                    title={"آیا از حذف محصول اطمینان دارید؟"} />}
            {isShowDetailsModal &&
                <DetailsModal onHide={closeDetailsModal}>
                    <table className="details-table">
                        <thead>
                            <tr>
                                <th>محبوبیت</th>
                                <th>فروش</th>
                                <th>رنگ بندی</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{mainProductInfos.popularity}%</td>
                                <td>{mainProductInfos.sale.toLocaleString()} تومان</td>
                                <td>{mainProductInfos.colors}</td>
                            </tr>
                        </tbody>
                    </table>

                </DetailsModal>}
            {isShowEditModal && <EditModal
                onClose={() => setIsShowEditModal(false)}
                onSubmit={updateProductInfos}
            >

                <div className="edit-products__form-group">
                    <span>
                        <AiOutlineDollar />
                    </span>
                    <input type="text" placeholder='عنوان جدید را وارد کنید'
                        className='edit-products__input'
                        onChange={(event) => { setNewProductTitle(event.target.value) }}
                        value={newProductTitle}
                    />
                </div>
                <div className="edit-products__form-group">
                    <span>
                        <AiOutlineDollar />
                    </span>
                    <input type="text" placeholder='قیمت جدید را وارد کنید'
                        className='edit-products__input'
                        onChange={(event) => { setNewProductPrice(event.target.value) }}
                        value={newProductPrice} />
                </div>
                <div className="edit-products__form-group">
                    <span>
                        <AiOutlineDollar />
                    </span>
                    <input type="text" placeholder='موجودی جدید را وارد کنید'
                        className='edit-products__input'
                        onChange={(event) => { setNewProductCount(event.target.value) }}
                        value={newProductCount} />
                </div>
                <div className="edit-products__form-group">
                    <span>
                        <AiOutlineDollar />
                    </span>
                    <input type="text" placeholder='آدرس کاور جدید را وارد کنید'
                        className='edit-products__input'
                        onChange={(event) => { setNewProductImg(event.target.value) }}
                        value={newProductImg} />
                </div>
                <div className="edit-products__form-group">
                    <span>
                        <AiOutlineDollar />
                    </span>
                    <input type="text" placeholder='محبوبیت جدید را وارد کنید'
                        className='edit-products__input'
                        onChange={(event) => { setNewProductPopularity(event.target.value) }}
                        value={newProductPopularity} />
                </div>
                <div className="edit-products__form-group">
                    <span>
                        <AiOutlineDollar />
                    </span>
                    <input type="text" placeholder='میزان فروش جدید را وارد کنید'
                        className='edit-products__input'
                        onChange={(event) => { setNewProductSale(event.target.value) }}
                        value={newProductSale} />
                </div>
                <div className="edit-products__form-group">
                    <span>
                        <AiOutlineDollar />
                    </span>
                    <input type="text" placeholder='تعداد رنگ بندی جدید را وارد کنید'
                        className='edit-products__input'
                        onChange={(event) => { setNewProductColors(event.target.value) }}
                        value={newProductColors} />
                </div>
            </EditModal>}
        </>
    )
}
