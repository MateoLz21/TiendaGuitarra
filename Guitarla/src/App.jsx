import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db";
import { useState } from "react";

function App() {

  // const [auth, setAuth] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [cart, setCart] = useState([])
  
  // const useEffect(() => {
  //   console.log('algo')
  // }, [dependencias])
  
  const [data,setData] = useState(db)
  const [cart,setCart] = useState([])
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  function addToCart(item){

    const itemsExists = cart.findIndex((guitar)=> guitar.id === item.id)
    if(itemsExists >= 0){
      if(cart[itemsExists].quantity >= MAX_ITEMS) return
      const updateCart = [...cart]
      updateCart[itemsExists].quantity++
      setCart(updateCart)
    }else{
      item.quantity = 1
      setCart(prevCart => [...prevCart,item]) 
    }
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter( guitar => guitar.id !== id))
    console.log('Eliminar elemento cart...',id)
  }

  function increaseQuantity(id){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,
          quantity: item.quantity +1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
          ...item,
          quantity: item.quantity -1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function clearCart(){
    setCart([])
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=>{
            return(
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
            )
          })}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App