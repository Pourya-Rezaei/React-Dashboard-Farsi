import React, { useEffect, useState } from 'react'
import ErrorBox from '../../components/ErrorBox/ErrorBox'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import EditModal from '../../components/EditModal/EditModal'
import "./User.css"
import DetailsModal from '../../components/DetailsModal/DetailsModal'




export default function Users() {
    const [getAllUsers, setGetAllUsers] = useState([])
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [mainUserInfos, setMainUserInfos] = useState([])

    const [userID, setUserID] = useState(null)

    const [updateFirstName, setUpdateFirstName] = useState("")
    const [updateLastName, setUpdateLastName] = useState("")
    const [updateUserName, setUpdateUserName] = useState("")
    const [updatePassword, setUpdatePassword] = useState("")
    const [updatePhone, setUpdatePhone] = useState("")
    const [updateCity, setUpdateCity] = useState("")
    const [updateEmail, setUpdateEmail] = useState("")
    const [updateAddress, setUpdateAddress] = useState("")
    const [updateScore, setUpdateScore] = useState("")
    const [updateBuy, setUpdateBuy] = useState("")
    useEffect(() => {
        fetchAllUsers()
    }, [])
    async function fetchAllUsers() {
        const response = await fetch("http://localhost:3000/api/users")
        const result = await response.json()
        console.log(result)
        setGetAllUsers(result)
    }
    const closeDeleteModal = () => setIsShowDeleteModal(false)
    const closeDetailsModal = () => setIsShowDetailsModal(false)
    const closeEditModal = () => setIsShowEditModal(false)

    const actionDeleteUser = async () => {
        const response = await fetch(`http://localhost:3000/api/users/${userID}`, {
            method: "DELETE"
        })
        const result = await response.json()
        console.log(result)
        fetchAllUsers()
        setIsShowDeleteModal(false)
    }


    const newUpdateUser = {
        firsname: updateFirstName,
        lastname: updateLastName,
        username: updateUserName,
        password: updatePassword,
        phone: updatePhone,
        city: updateCity,
        email: updateEmail,
        address: updateAddress,
        score: updateScore,
        buy: updateBuy,
    }
    const updateUser = async (event) => {
        event.preventDefault()
        const response = await fetch(`http://localhost:3000/api/users/${userID}`, {
            method: "Put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUpdateUser)
        })
        const result = await response.json()
        console.log(result)
        fetchAllUsers()
        setIsShowEditModal(false)

    }
    return (
        <>
            <div className="cms-main">
                <h1 className='cms-title'>لیست کاربران</h1>
                {
                    getAllUsers.length ? (
                        <table className="cms-table">
                            <thead>
                                <tr>
                                    <th>نام</th>
                                    <th>نام خانوادگی</th>
                                    <th>نام کاربری</th>
                                    <th>ایمیل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAllUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            {user.firsname}
                                        </td>
                                        <td>
                                            {user.lastname}
                                        </td>
                                        <td>
                                            {user.username}
                                        </td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                setMainUserInfos(user)
                                                setUserID(user.id)
                                                setIsShowDetailsModal(true)
                                            }}>جزییات</button>
                                            <button onClick={() => {
                                                setIsShowEditModal(true)
                                                setUserID(user.id)
                                                setUpdateFirstName(user.firsname)
                                                setUpdateLastName(user.lastname)
                                                setUpdateUserName(user.username)
                                                setUpdatePassword(user.password)
                                                setUpdatePhone(user.phone)
                                                setUpdateCity(user.city)
                                                setUpdateEmail(user.email)
                                                setUpdateAddress(user.address)
                                                setUpdateScore(user.score)
                                                setUpdateBuy(user.buy)
                                            }}>ویرایش</button>
                                            <button onClick={() => {
                                                setIsShowDeleteModal(true)
                                                setUserID(user.id)
                                            }}>حدف</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <ErrorBox msg={"هیچ کاربری یافت نشد"} />

                }
                {
                    isShowDeleteModal && <DeleteModal
                        title={"آیا از حدف کاربر مطمعن هستید؟"}
                        cancel={closeDeleteModal}
                        submit={actionDeleteUser}
                    />
                }

                {
                    isShowEditModal &&
                    <EditModal
                        onClose={closeEditModal}
                        onSubmit={updateUser}
                    >
                        <div className="container">
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updateFirstName}
                                    onChange={(event) => setUpdateFirstName(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updateLastName}
                                    onChange={(event) => setUpdateLastName(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updateEmail}
                                    onChange={(event) => setUpdateEmail(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updatePassword}
                                    onChange={(event) => setUpdatePassword(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updateUserName}
                                    onChange={(event) => setUpdateUserName(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updatePhone}
                                    onChange={(event) => setUpdatePhone(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updateCity}
                                    onChange={(event) => setUpdateCity(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updateAddress}
                                    onChange={(event) => setUpdateAddress(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updateScore}
                                    onChange={(event) => setUpdateScore(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                            <div className="edit-user__info-input-group">
                                <span>

                                </span>
                                <input type="text"
                                    value={updateBuy}
                                    onChange={(event) => setUpdateBuy(event.target.value)}
                                    className='edit-user__info-input '
                                    placeholder='مقدار جدید را وارد نمایید' />
                            </div>
                        </div>
                    </EditModal>
                }
                {
                    isShowDetailsModal &&
                    <DetailsModal onHide={closeDetailsModal}>
                        <table className='cms-table'>
                            <thead>
                                <tr>
                                    <td>رمز عبور</td>
                                    <td>شماره تماس</td>
                                    <td>شهر</td>
                                    <td>آدرس</td>
                                    <td>امتیاز کاربر</td>
                                    <td>مبلغ خرید کاربر</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{mainUserInfos.password}</td>
                                    <td>{mainUserInfos.phone}</td>
                                    <td>{mainUserInfos.city}</td>
                                    <td>{mainUserInfos.address}</td>
                                    <td>{mainUserInfos.score}</td>
                                    <td>{mainUserInfos.buy.toLocaleString() + "تومان"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </DetailsModal>
                }
            </div>
        </>
    )
}
