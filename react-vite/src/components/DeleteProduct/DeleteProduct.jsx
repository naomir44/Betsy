import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchDeleteProduct } from "../../redux/products";
import { useState } from "react";
import './DeleteProduct.css'

const DeleteProduct = ({ productId }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})

    const handleClick = (e) => {
        e.preventDefault()
        setErrors({})
        dispatch(fetchDeleteProduct(productId))
            .then(closeModal)
            .catch(async (res) => {
                let data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
    }
    return (
        <div className="delete-modal">
            <div className="delete-content">
                <form>
                    <h3>Are you sure you want to delete this product?</h3>
                    {errors.message && (
                        <div className="error-message">{errors.message}</div>
                    )}
                    <div className="delete-actions">
                    <button className="delete-button cancel-button" onClick={closeModal}>No (Keep It)</button>
                        <button className="delete-button" onClick={handleClick}>Yes (Delete It)</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteProduct
