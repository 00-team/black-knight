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

type Order = { label: string; reverse: boolean }
type OU = (order: Order) => void

const OrdersList: FC<OrdersListProps> = ({ active, close }) => {
    const BraceInfo = useAtomValue(BraceInfoAtom)
    const setOptions = useSetAtom(ResultOptionsAtom)

    const [SelectedOrders, setSelectedOrders] = useState<Order[]>([])
    const [Draged, setDraged] = useState<Order | null>(null)

    const SelectedsLabels = SelectedOrders.map(o => o.label)

    const OrderToOption = (order: Order) =>
        order.reverse ? '-' + order.label : order.label

    const SelectOrder = (order: Order, select: boolean) => {
        if (select === SelectedOrders.includes(order)) return

        if (select) {
            setSelectedOrders(s => [...s, order])
        } else {
            setSelectedOrders(s => s.filter(o => o !== order))
        }
    }
    const ReverseOrder: OU = order => {
        if (!SelectedOrders.includes(order)) return

        setSelectedOrders(s =>
            s.map(o => (o === order ? { ...o, reverse: !o.reverse } : o))
        )
    }

    useEffect(() => {
        setOptions({
            orders: SelectedOrders.map(OrderToOption),
        })
    }, [SelectedOrders])

    if (BraceInfo === 'loading')
        return (
            <div className='loading-orders'>
                <Loading />
            </div>
        )

    const NotSelecteds = BraceInfo.orders.filter(
        o => SelectedsLabels.indexOf(o) === -1
    )

    return (
        <div className={`orderslist-container ${C(active)} title_small`}>
            <div className='active-orders title_smaller'>
                <ol
                    className='list-container'
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                        if (!Draged) return
                        e.preventDefault()
                        SelectOrder(Draged, true)
                    }}
                >
                    {SelectedOrders.map((order, index) => (
                        <li
                            draggable
                            key={index}
                            className='order-active'
                            onDragStart={() => {
                                setDraged(order)
                            }}
                            onDrop={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (Draged === order || Draged === null) return

                                let selecteds = [...SelectedOrders]
                                let idx = selecteds.indexOf(order)
                                selecteds = selecteds.filter(i => i !== Draged)
                                selecteds.splice(idx, 0, Draged)
                                setSelectedOrders(selecteds)
                            }}
                            onDragOver={e => e.preventDefault()}
                        >
                            {order.label}
                            <div
                                className='reverse-orders-wrapper '
                                onClick={() => ReverseOrder(order)}
                            >
                                <div className='icon'>
                                    <FaRecycle size={19} />
                                </div>
                                <div className={`checkbox ${C(order.reverse)}`}>
                                    <div className='custom-checkbox-label'>
                                        <div className='custom-checkbox-label-aux'></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div
                className='list-orders title_smaller'
                draggable={false}
                onDragOver={e => e.preventDefault()}
                onDrop={() => {
                    if (!Draged) return
                    SelectOrder(Draged, false)
                }}
            >
                {NotSelecteds.length !== 0 ? (
                    NotSelecteds.map((order, index) => (
                        <div
                            draggable
                            key={index}
                            className='list-order'
                            onDragStart={e => {
                                setDraged({ label: order, reverse: false })
                                e.dataTransfer.dropEffect = 'move'
                            }}
                        >
                            {order}
                        </div>
                    ))
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
