import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { AddProduct } from '../features/admin/components/AddProduct'
import { Footer } from '../features/footer/Footer'

export const AddProductPage = () => {
  return (
    <>
    <Navbar/>
    <AddProduct/>
    <Footer/>
    </>
  )
}
