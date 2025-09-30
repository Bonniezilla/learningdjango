import { motion } from 'motion/react';

function Cart({ cart, removeFromCart, updateAmount }) {
    return (
        <div className="flex flex-col bg-antiflash rounded w-auto h-auto p-4">
            <h2 className="font-bold">Cart</h2>
            {cart.length > 0 ? (
                <ul>
                    {cart.map((item, index) => (
                        <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={index}
                            className="border p-4 m-2 bg-white shadow-2xl rounded flex flex-col">
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-gray-600">${item.price * item.amount}</p>
                            <p className='text-blaft-800 font-bold text-2xl'>{item.amount}</p>
                            <div className="flex flex-col gap-2">
                                <button
                                    className='bg-blaft-500 hover:bg-blaft-700 text-white font-bold duration-300 disabled:opacity-50 w-1/3 self-end p-2'
                                    onClick={() => updateAmount(item.id, item.amount - 1)} disabled={item.amount <= 1}>
                                    -
                                </button>
                                <button
                                    className='bg-blaft-500 hover:bg-blaft-700 text-white font-bold duration-300 disabled:opacity-50 w-1/3 self-end p-2'
                                    onClick={() => updateAmount(item.id, item.amount + 1)}>
                                    +
                                </button>
                            </div>
                            <button
                                className="bg-africanviolet text-white p-2 rounded mt-2 w-1/3 self-end hover:bg-blaft-700 transition"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </motion.li>
                    ))
                    }
                </ul>
            ) : (
                <p className="text-gray-600 font-bold text-3xl">Your cart is empty.</p>)
            }
        </div>
    )
}

export default Cart;