import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchDeleteProduct } from "../../redux/products";
import { useState } from "react";

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
        <>
            <form>
                <h3>Are you sure you want to delete this product?</h3>
                {errors.message && (
                    <div>{errors}</div>
                )}
                <div>
                    <button onClick={handleClick}>Yes (Delete It)</button>
                    <button onClick={closeModal}>No (Keep It)</button>
                </div>
            </form>
        </>
    )
}

export default DeleteProduct
