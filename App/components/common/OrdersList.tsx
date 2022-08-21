import React, { FC, useEffect, useState } from 'react'

import { C } from '@00-team/utils'

import { ImCross } from '@react-icons/all-files/im/ImCross'

import { useSetAtom } from 'jotai'
import { ResultOptionsAtom } from 'state'

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
    const [ReverseResult, setReverseResult] = useState(false)

    const setOptions = useSetAtom(ResultOptionsAtom)

    useEffect(() => {
        setOptions({
            orders: ReverseResult ? ActiveOrders.reverse() : ActiveOrders,
        })
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
                        draggable={'false'}
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => {
                            if (
                                ActiveOrders.includes(
                                    e.dataTransfer.getData('text')
                                )
                            ) {
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
                        {ActiveOrders.length !== orders.length ? (
                            <>
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
                                                    e.dataTransfer.dropEffect =
                                                        'move'
                                                }}
                                            >
                                                {order}
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </>
                        ) : (
                            <>No Orders Here</>
                        )}
                    </div>
                    <div
                        className='close-btn'
                        onClick={() => setSeeOrders(false)}
                    >
                        <ImCross size={24} />
                    </div>
                    <div
                        className='reverse-orders-wrapper title_smaller'
                        onClick={() => setReverseResult(!ReverseResult)}
                    >
                        <div className={`checkbox ${C(ReverseResult)}`}>
                            <div className='custom-checkbox-label'>
                                <div className='custom-checkbox-label-aux'></div>
                            </div>
                        </div>
                        <div className='holder'>Reverse Result</div>
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
