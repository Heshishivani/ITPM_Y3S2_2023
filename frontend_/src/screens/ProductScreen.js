import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail, productDetailFetch, removeProductDetail } from '../features/slice/productsSlice'
import { addToCart } from '../features/slice/cartSlice'


const ProductScreen = () => {
  const dispatch = useDispatch()
  const item = useSelector(getProductDetail)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(productDetailFetch(id));
    return () => {
      dispatch(removeProductDetail());
    }
  }, [dispatch, id])

  const addToCartHandler = (item) => {
    dispatch(addToCart(item))
    navigate("/cart")
  }

  return (
    <div className='productscreen'>

      <>
        <div className="productscreen-left">
          <div className="left-image">
            <img src={item.imageUrl} alt={item.name} />
          </div>

          <div className="left-info">
            <p className="left-name">{item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Description: {item.description}</p>
          </div>
        </div>
        <div className="productscreen-right">
          <div className="right-info">
            <p>Price: <span>${item.price}</span></p>
            <p>Status: <span>{item.countInStock > 0 ? "In Stock" : "Out of Stock"}</span></p>
            <p>
              Qty in stock:
              <span>{item.countInStock}</span>
            </p>
            <p>
              <button type='button' onClick={() => addToCartHandler(item)} >
                Add to cart
              </button>
            </p>
          </div>
        </div>
      </>
    </div>
  )
}

export default ProductScreen