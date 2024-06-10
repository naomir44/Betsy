import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchCreateProduct } from "../../redux/products"


const CreateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
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
            const newProduct = await dispatch(fetchCreateProduct(payload))

            const newProductId = newProduct.id
            await dispatch(fetchCreateProduct({
                url: url,
                product_id: newProductId
            }))
            if (newProduct) {
                navigate(`/products/${+newProductId}`)
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
            <button className="product-form-submit" type="submit">Create Product</button>
        </form>
    )
}


export default CreateProduct
