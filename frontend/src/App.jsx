import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'


const Login = lazy(() => import('./pages/Login'))
const About = lazy(() => import('./pages/About'))
const Cart = lazy(() => import('./pages/Cart'))
const Collection = lazy(() => import('./pages/Collection'))
const Order = lazy(() => import('./pages/Order'))
const Contact = lazy(() => import('./pages/Contact'))
const Home= lazy(() => import('./pages/Home'))
const Placeordder= lazy(() => import('./pages/Placeorder'))
// import Home from './pages/Home'

const Product = lazy(() => import('./pages/Product'))
const Userlayout = lazy(() => import('./user/Userlayout'))
import Loader from './components/Loader'
const Adminlayout = lazy(() => import('./admin/Adminlayout'))
const Add = lazy(() => import('./admin/Add'))
const List = lazy(() => import('./admin/List'))
const Orderlist = lazy(() => import('./admin/Orderlist'))



const Protective = lazy(() => import('./components/Protective'))
const Notfound = lazy(() => import('./components/Notfound'))


const App = () => {
  return (
<main className="app">

<Suspense fallback={<Loader />}>

  <Routes>

  {/* Login route - separate from protected routes */}
  <Route path='/login' element={<Login />} />

  <Route  path='/' element={
    <Protective>
      <Userlayout />
    </Protective>}>

  <Route index element={<Home />}/>
  <Route path='collection' element={<Collection />}/>
  <Route path='contact' element={<Contact />}/>
  <Route path='cart' element={<Cart />}/>
  <Route path='product/:id' element={<Product />}/>
  <Route path='myorder' element={<Order />}/>
  <Route path='about' element={<About />}/>
  <Route path='placeorder' element={<Placeordder />}/>

  </Route >
  <Route path='/admin' element={
    <Protective>

      <Adminlayout />
    </Protective>
      } >
  <Route  path='add' element={< Add/>}/>
  <Route  path='list' element={< List/>}/>
  <Route  path='ol' element={< Orderlist/>}/>
  </Route>
  <Route  path='*' element={<Notfound/>}/>
  </Routes>
</Suspense>

</main>
  )
}

export default App