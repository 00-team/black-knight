import React, { FC, useState } from 'react'

import { C, CountAnim } from '@00-team/utils'

import { BsQuestion } from '@react-icons/all-files/bs/BsQuestion'
import { ImCross } from '@react-icons/all-files/im/ImCross'
import { IoMdSend } from '@react-icons/all-files/io/IoMdSend'

import { useAtomValue, useSetAtom } from 'jotai'
import { BraceResultAtom, PageModel, ResultOptionsAtom } from 'state'

import './style/paginator.scss'

const Paginator: FC<PageModel> = props => {
    const UpdateResultOptions = useSetAtom(ResultOptionsAtom)
    const BraceResult = useAtomValue(BraceResultAtom)

    const [SendPage, setSendPage] = useState({
        page: 0,
        status: false,
    })
    const [IsActive, setIsActive] = useState(false)

    const getResult = () => {
        if (BraceResult === 'loading') return 0

        return BraceResult.result_count
    }

    const PageNumber = (value: string) => {
        if (!value) return
        const page = parseInt(value)

        if (page > 0 && page <= props.max && page !== props.current) {
            return setSendPage({
                page,
                status: true,
            })
        } else {
            return setSendPage({
                page: 0,
                status: false,
            })
        }
    }
    return (
        <div className='paginator-container'>
            <ul className='paginator-items '>
                {PageRange(props).map((item, index) => {
                    if (item === 'ep')
                        return (
                            <li
                                key={index}
                                className='paginator-item description'
                            >
                                <span className='paginator-link'>
                                    <button className='paginator-link'>
                                        ...
                                    </button>
                                </span>
                            </li>
                        )

                    return (
                        <li
                            key={index}
                            className={
                                'paginator-item description' +
                                C(props.current === item, 'selected')
                            }
                        >
                            <button
                                onClick={() =>
                                    props.current !== item &&
                                    UpdateResultOptions({
                                        page: item,
                                    })
                                }
                                className='paginator-link paginator-link-number'
                            >
                                {item}
                            </button>
                        </li>
                    )
                })}
            </ul>
            {props.max > 5 && (
                <div className={'goto-container' + C(IsActive)}>
                    <input
                        type={'number'}
                        placeholder='Page Number...'
                        autoFocus={IsActive}
                        onChange={e => PageNumber(e.target.value)}
                    />
                    <button
                        className={C(SendPage.status)}
                        onClick={() => {
                            if (SendPage.status) {
                                UpdateResultOptions({
                                    page: SendPage.page,
                                })
                            } else {
                                setIsActive(!IsActive)
                            }
                        }}
                    >
                        <div className='before'>
                            {C(IsActive) ? (
                                <ImCross size={18} fill={'black'} />
                            ) : (
                                <BsQuestion size={30} fill={'black'} />
                            )}
                        </div>
                        <div className='after'>
                            <IoMdSend size={28} fill={'black'} />
                        </div>
                    </button>
                </div>
            )}
            <div className='result-counter title_small'>
                <div className='counter-result'>
                    <CountAnim
                        start={0}
                        speed={getResult() > 1000 ? 200 : 50}
                        end={getResult()}
                    />
                </div>
                <div className='holder'> Results Found</div>
            </div>
        </div>
    )
}

const NumRange = (start: number, end: number) =>
    Array.from(Array(end - start + 1)).map((_, idx) => idx + start)

type TPageRange = (props: PageModel) => (number | 'ep')[]
const PageRange: TPageRange = ({ current, max }) => {
    if (max <= 5) return NumRange(1, max)
    if (current <= 2) return [1, 2, 3, 'ep', max - 1, max]
    if (current >= max - 1) return [1, 'ep', max - 2, max - 1, max]
    return [1, 'ep', current - 1, current, current + 1, 'ep', max]
}

export default Paginator
