import React from 'react'
import { ProductUpdate } from '../features/admin/components/ProductUpdate'
import {Navbar} from '../features/navigation/components/Navbar'
import { Footer } from '../features/footer/Footer'

export const ProductUpdatePage = () => {
  return (
    <>
    <Navbar/>
    <ProductUpdate/>
    <Footer/>
    </>
  )
}
