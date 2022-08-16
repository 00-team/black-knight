import React, { FC, useEffect, useState } from 'react'

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
    const [ActiveOrders, setActiveOrders] = useState<string[]>([])

    useEffect(() => {
        console.log(ActiveOrders)
    }, [ActiveOrders])

    return (
        <div className={`orderslist-container ${C(className)} title_small`}>
            {orders ? (
                <>
                    <div className='active-orders'>
                        <ol
                            className='list-container'
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => {
                                e.preventDefault()
                                console.log(e.dataTransfer.getData('text'))
                                setActiveOrders(orders => [
                                    ...orders,
                                    e.dataTransfer.getData('text'),
                                ])
                            }}
                        >
                            {orders.map((_, index) => {
                                if (ActiveOrders[index]) {
                                    return (
                                        <li
                                            draggable
                                            key={index}
                                            className='order-active'
                                        >
                                            {ActiveOrders[index]}
                                        </li>
                                    )
                                } else return <li key={index}></li>
                            })}
                        </ol>
                    </div>
                    <div
                        className='list-orders title_smaller'
                        onDragOver={e => e.preventDefault()}
                    >
                        {orders.map((order, index) => {
                            if (!ActiveOrders.includes(order)) {
                                return (
                                    <div
                                        draggable={true}
                                        key={index}
                                        className='list-order'
                                        onDragStart={e => {
                                            e.dataTransfer.setData(
                                                'text',
                                                order
                                            )
                                        }}
                                    >
                                        {order}
                                    </div>
                                )
                            } else {
                                return <></>
                            }
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
