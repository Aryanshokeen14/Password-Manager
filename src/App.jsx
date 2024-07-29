import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
function App() {
  return (
    <>
   

    <Navbar/>
    <div><hr className='border-gray-800'/></div>
      
    <Manager/>
   
    
    
    <div className='fixed bottom-0 w-full'>
      <Footer/>
    </div>
   
      
    
  
    </>
  )
}

export default App
