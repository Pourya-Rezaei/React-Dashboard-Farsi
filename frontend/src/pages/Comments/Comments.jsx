import React, { useEffect, useState } from 'react'
import ErrorBox from '../../components/ErrorBox/ErrorBox'
import DetailsModal from '../../components/DetailsModal/DetailsModal'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import EditModal from '../../components/EditModal/EditModal'
import "./Comments.css"
export default function Comments() {
    const [allComments, setAllComments] = useState([])
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShoAcceptModal, setShowAcceptModal] = useState(false)
    const [mainCommentBody, setMainCommentBody] = useState("")
    const [commentID, setCommentID] = useState(null)
    useEffect(() => {
        fetchAllComments()
    }, [])

    async function fetchAllComments() {
        const response = await fetch("http://localhost:3000/api/comments")
        const result = await response.json()
        setAllComments(result)
        console.log(result)
    }

    const closeDetailsModal = () => setIsShowDetailsModal(false)
    const closeDeleteModal = () => setIsShowDeleteModal(false)
    const deleteComment = async () => {
        console.log("comment")
        const response = await fetch(`http://localhost:3000/api/comments/${commentID}`, {
            method: "DELETE",
        })
        const result = response.json()
        console.log(result)
        fetchAllComments()
        setIsShowDeleteModal(false)
    }

    const closeEditModal = () => {
        setIsShowEditModal(false)
    }

    const editComment = async (event) => {
        event.preventDefault()

        const response = await fetch(`http://localhost:3000/api/comments/${commentID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                body: mainCommentBody
            })
        })
        const result = await response.json()
        console.log(result)
        closeEditModal()
        fetchAllComments()
    }
    const closeAcceptModal = () => {
        setShowAcceptModal(false)
    }
    const acceptComment = async () => {
        // const response = await fetch(`http://localhost:3000/api/comments/accept/${commentID}`, {
        //     method: "POST"
        // })
        // const result = await response.json()
        // console.log(result)
        setShowAcceptModal(false)
    }
    return (
        <div className='cms-main'>
            <h1 className='cms-title'>لیست کامنت ها</h1>
            {allComments.length ? (<table className='cms-table'>
                <thead>
                    <tr>
                        <th>نام کاربر</th>
                        <th>محصول</th>
                        <th>کامنت</th>
                        <th>تاریخ</th>
                        <th>ساعت</th>
                    </tr>
                </thead>
                <tbody>
                    {allComments.map(comment => (
                        <tr>
                            <td>{comment.userID}</td>
                            <td>{comment.productID}</td>
                            <td><button onClick={() => {
                                setMainCommentBody(comment.body)
                                setIsShowDetailsModal(true)
                            }}>دیدن کامنت</button></td>
                            <td>{comment.date}</td>
                            <td>{comment.hour}</td>
                            <td>
                                <button onClick={() => {
                                    setIsShowDeleteModal(true)
                                    setCommentID(comment.id)
                                }}>
                                    حدف
                                </button>
                                <button onClick={() => {
                                    setIsShowEditModal(true)
                                    setMainCommentBody(comment.body)
                                    setCommentID(comment.id)
                                }}>
                                    ویرایش
                                </button>
                                <button>
                                    پاسخ
                                </button>
                                <button onClick={() => {
                                    setShowAcceptModal(true)
                                    setCommentID(comment.id)
                                }}>
                                    تایید
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            ) : <ErrorBox msg={"هیچ پیامی یافت نشد"} />}
            {
                isShowDetailsModal &&
                (<DetailsModal
                    onHide={closeDetailsModal}
                >
                    <p className='text-modal'>
                        {mainCommentBody}
                    </p>
                    <button className="text-modal__close-btn" onClick={closeDetailsModal}>
                        بستن
                    </button>
                </DetailsModal>)
            }
            {
                isShowDeleteModal && (
                    <DeleteModal
                        cancel={closeDeleteModal}
                        submit={deleteComment}
                        title={"آیا از حذف محصول اطمینان دارید؟"}
                    />
                )
            }
            {
                isShowEditModal && (
                    <EditModal onClose={closeEditModal} onSubmit={editComment}>
                        <textarea value={mainCommentBody}
                            onChange={(event) => setMainCommentBody(event.target.value)}>
                        </textarea>
                    </EditModal>
                )
            }

            {isShoAcceptModal && <DeleteModal
                title={"آیا از تایید کامنت اطمینان داردی؟"}
                cancel={closeAcceptModal}
                submit={acceptComment}
            />}
        </div>
    )
}
