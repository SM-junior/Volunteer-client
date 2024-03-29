import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import useCart from '../../hooks/useCart';
import Swal from 'sweetalert2';

const Cart = () => {
    const cartData = useLoaderData();
    const [items, setItems] = useState(cartData)
    const [cart, refetch] = useCart();


    const handleRemoveCart = (id) => {

        fetch(`http://localhost:3000/cart/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: 'DELETE!',
                        text: 'Item item deleted successful',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    const remainingUsers = items.filter(user => user._id !== id)
                    setItems(remainingUsers)
                }
            })
    }
    return (
        <div className='py-10 grid grid-cols-2 gap-4'>
            {items ?
                items.map(item =>
                    <div key={item._id} className='bg-slate-100 px-6 py-2 mb-2 flex w-full items-center justify-between container mx-auto'>
                        <img className='w-16' src={item.img} alt="" />
                        <h2>{item.title}</h2>
                        <button onClick={() => handleRemoveCart(item._id)} className='btn btn-error'>Delete</button>
                    </div>
                )
                : <span className="loading loading-bars loading-lg"></span>
            }
        </div>
    )
};

export default Cart;


