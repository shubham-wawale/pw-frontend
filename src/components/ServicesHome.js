import {
    Box,
    useColorModeValue,
  } from '@chakra-ui/react'
import BookSitter from './Services/BookSitter'
import {useNavigate} from "react-router-dom"
import Navbar from './Navbar'
  
  const ServicesHome = ()=>{
    const navigate = useNavigate();
    const navTabs = ["Book Sitter", "Adopt", "Pet Store"]
    return (
      <>
      <Navbar />
      <BookSitter />
      </>
    )
  }
  

  export default ServicesHome;