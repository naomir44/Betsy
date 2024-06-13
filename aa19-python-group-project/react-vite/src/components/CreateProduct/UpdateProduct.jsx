import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchAddImage, fetchUpdateProduct } from "../../redux/products"


const UpdateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { productId } = useParams()
    productId = +productId
    const product = useSelector(state => state.products[productId])
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [category, setCategory] = useState(product.category)
    const [errors, setErrors] = useState({})
    const [url, setUrl] = useState('')
    const user = useSelector(state => state.session.user)
    const categories = ['Art', 'Clothing', 'Jewelry', 'Home & Living', 'Toys', 'Vintage']

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = {}

        if (name.length === 0) validationErrors.name = 'Give your product a name'
        if (description.length === 0) validationErrors.description = 'Give your product a description'
        if (price === 0) validationErrors.price = 'Your product needs a price'
        if (!category) validationErrors.categories = 'Must select a category'

        if (Object.values(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        } else {
            const payload = {
                name: name,
                description: description,
                price: price,
                user_id: user.id,
                category_id: categories.indexOf(category) + 1
            }
            const updatedProduct = await dispatch(fetchUpdateProduct(payload, productId))
            console.log(updatedProduct)

            if (updatedProduct) {
                await dispatch(fetchAddImage({
                    url: url,
                    product_id: productId
                }))
                navigate(`/products/${productId}`)
            }
        }
    }

    return (
        <form className="create-product-form" onSubmit={handleSubmit}>
            <label className="input-name">
                Product Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                />
            </label>
            {errors.name && <p className="form-errors">{errors.name}</p>}
            <label className="input-description">
                Description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
            </label>
            {errors.description && <p className="form-errors">{errors.description}</p>}
            <label className="input-price">
                Price
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />
            </label>
            {errors.price && <p className="form-errors">{errors.price}</p>}
            <label className="input-category">
                Category
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category, i) => (
                        <option key={i} value={category}>{category}</option>
                    ))}
                </select>
            </label>
            {errors.category && <p className="form-errors">{errors.category}</p>}
            <label className="input-image">
                Add an Image
                <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Image URL"
                />
            </label>
            <button className="product-form-submit" type="submit">Update Product</button>
        </form>
    )
}


export default UpdateProduct
