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
                                if (
                                    orders.includes(
                                        e.dataTransfer.getData('text')
                                    ) &&
                                    !ActiveOrders.includes(
                                        e.dataTransfer.getData('text')
                                    )
                                ) {
                                    setActiveOrders(orders => [
                                        ...orders,
                                        e.dataTransfer.getData('text'),
                                    ])
                                } else return
                            }}
                        >
                            {orders.map((_, index) => {
                                if (ActiveOrders[index]) {
                                    return (
                                        <li
                                            draggable
                                            key={index}
                                            className='order-active'
                                            onDragStart={e => {
                                                e.dataTransfer.setData(
                                                    'text',
                                                    e.currentTarget.innerText
                                                )
                                            }}
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
                        onDrop={e => {
                            console.log(orders)
                            console.log(ActiveOrders)
                            console.log(e.dataTransfer.getData('text'))
                            if (
                                ActiveOrders.includes(
                                    e.dataTransfer.getData('text')
                                )
                            ) {
                                console.log('slm')

                                setActiveOrders(orders =>
                                    orders.filter(
                                        order =>
                                            order !==
                                            e.dataTransfer.getData('text')
                                    )
                                )
                            } else return
                        }}
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
                                            e.dataTransfer.dropEffect = 'move'
                                        }}
                                    >
                                        {order}
                                    </div>
                                )
                            } else {
                                return null
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
