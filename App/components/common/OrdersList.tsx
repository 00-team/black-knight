import React, { FC } from 'react'

import { C } from '@00-team/utils'

import { Loading } from './Loading'

import './style/orderslist.scss'

interface OrdersListProps {
    orders: any[] | null
    className?: string
}

const OrdersList: FC<OrdersListProps> = ({ orders, className }) => {
    className
    return (
        <div className={`orderslist-container ${C(className)}`}>
            {orders ? (
                <>
                    <div className='active-orders'>
                        <ol className='list-container'>
                            {orders.map((_, index) => {
                                return <li key={index}></li>
                            })}
                        </ol>
                    </div>
                    <div className='list-orders'>
                        {orders.map((order, index) => {
                            return (
                                <div key={index} className='list-order'>
                                    {order}
                                </div>
                            )
                        })}
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
