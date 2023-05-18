import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getLoading, productFetch } from '../features/slice/productsSlice'
import Product from '../components/Product' 

const HomeScreen = () => {
  const dispatch = useDispatch()
  const items = useSelector(getAllProducts)
  const loading = useSelector(getLoading)
  
  useEffect(() => {
    dispatch(productFetch())
  }, [dispatch])

  return (
    <div className='homescreen'>
      <h2 className='homescreen-title'>Latest Products</h2>

      <div className="homescreen-products">
        {loading ? <h2>Loading...</h2> : items.map(item => (
          <Product key={item._id} id={item._id} name={item.name} price={item.price} imageUrl={item.imageUrl} description={item.description}/>
        ))}
      </div>
    </div>
  )
}

export default HomeScreen