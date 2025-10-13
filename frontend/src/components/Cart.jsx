import { motion } from 'motion/react';

function Cart({ cart, removeFromCart, updateAmount }) {
    return (
        <div className="flex flex-col bg-antiflash rounded w-full flex-1 p-4">
            <h2 className="font-bold text-2xl">Cart</h2>
            <div className="flex flex-col w-full h-full overflow-y-auto">
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item, index) => (
                            <motion.li
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={index}
                                className="border p-4 m-2 bg-white shadow-2xl rounded flex flex-col">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-2">

                                        <h3 className="font-bold text-3xl">{item.name}</h3>
                                        <p className="text-blaft-800">Unit Price: ${item.price}</p>
                                        <p className="text-blaft-800 text-2xl">{`1 X ${item.amount} = $` + (item.price * item.amount).toFixed(2)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className='bg-blaft-500 hover:bg-blaft-700 text-white font-bold rounded duration-300 disabled:opacity-50 w-1/3 self-end p-2'
                                            onClick={() => updateAmount(item.id, item.amount - 1)} disabled={item.amount <= 1}>
                                            -
                                        </button>
                                        <button
                                            className='bg-blaft-500 hover:bg-blaft-700 text-white font-bold rounded duration-300 disabled:opacity-50 w-1/3 self-end p-2'
                                            onClick={() => updateAmount(item.id, item.amount + 1)}>
                                            +
                                        </button>
                                        <button
                                            className="bg-africanviolet text-white p-2 rounded mt-2 w-1/3 self-end hover:bg-blaft-700 transition"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </motion.li>
                        ))
                        }
                    </ul>
                ) : (
                    <p className="text-gray-600 font-bold text-3xl">Your cart is empty.</p>)
                }
            </div>
        </div>
    )
}

export default Cart;