import React, { FC } from 'react'

import { C } from '@00-team/utils'

import { ImCross } from '@react-icons/all-files/im/ImCross'

import { Loading } from './Loading'

import './style/orderslist.scss'

interface OrdersListProps {
    orders: any[] | null
    className?: string

    setSeeOrders: (seeOrders: boolean) => void
}

const OrdersList: FC<OrdersListProps> = ({
    orders,
    className,
    setSeeOrders,
}) => {
    return (
        <div className={`orderslist-container ${C(className)} title_small`}>
            {orders ? (
                <>
                    <div className='active-orders'>
                        <ol className='list-container'>
                            {orders.map((_, index) => {
                                return <li key={index}></li>
                            })}
                        </ol>
                    </div>
                    <div className='list-orders title_smaller'>
                        {orders.map((order, index) => {
                            return (
                                <div key={index} className='list-order'>
                                    {order}
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className='close-btn'
                        onClick={() => setSeeOrders(false)}
                    >
                        <ImCross size={24} />
                    </div>
                </>
            ) : (
                <div className='loading-orders'>
                    <Loading />
                </div>
            )}
        </div>
    )
}

export default OrdersList
