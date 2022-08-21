import React, { FC, useEffect, useState } from 'react'

import { C } from '@00-team/utils'

import { FaRecycle } from '@react-icons/all-files/fa/FaRecycle'
import { ImCross } from '@react-icons/all-files/im/ImCross'

import { useAtomValue, useSetAtom } from 'jotai'
import { BraceInfoAtom, ResultOptionsAtom } from 'state'

import { Loading } from 'comps'

import './style/orderslist.scss'

interface OrdersListProps {
    active?: boolean
    close: () => void
}

const OrdersList: FC<OrdersListProps> = ({ active, close }) => {
    const BraceInfo = useAtomValue(BraceInfoAtom)

    const [ActiveOrders, setActiveOrders] = useState<string[]>([])
    const [ReverseResult, setReverseResult] = useState(false)

    const setOptions = useSetAtom(ResultOptionsAtom)

    useEffect(() => {
        setOptions({
            orders: ActiveOrders,
        })
    }, [ActiveOrders])

    if (BraceInfo === 'loading')
        return (
            <div className='loading-orders'>
                <Loading />
            </div>
        )

    return (
        <div className={`orderslist-container ${C(active)} title_small`}>
            <div className='active-orders title_smaller'>
                <ol
                    className='list-container'
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                        e.preventDefault()
                        if (
                            BraceInfo.orders.includes(
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
                    {BraceInfo.orders.map((_, index) => {
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
                                    <div
                                        className='reverse-orders-wrapper '
                                        onClick={() =>
                                            setReverseResult(!ReverseResult)
                                        }
                                    >
                                        <div className='icon'>
                                            <FaRecycle size={19} />
                                        </div>
                                        <div
                                            className={`checkbox ${C(
                                                ReverseResult
                                            )}`}
                                        >
                                            <div className='custom-checkbox-label'>
                                                <div className='custom-checkbox-label-aux'></div>
                                            </div>
                                        </div>
                                    </div>
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
                    if (ActiveOrders.includes(e.dataTransfer.getData('text'))) {
                        setActiveOrders(orders =>
                            orders.filter(
                                order =>
                                    order !== e.dataTransfer.getData('text')
                            )
                        )
                    } else return
                }}
            >
                {ActiveOrders.length !== BraceInfo.orders.length ? (
                    <>
                        {BraceInfo.orders.map((order, index) => {
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
                    </>
                ) : (
                    <>No Orders Here</>
                )}
            </div>
            <div className='close-btn' onClick={close}>
                <ImCross size={24} />
            </div>
        </div>
    )
}

export { OrdersList }
