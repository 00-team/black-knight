import React, { CSSProperties, FC, useState } from 'react'

// icons
import { MdKeyboardArrowDown } from '@react-icons/all-files/md/MdKeyboardArrowDown'

// style
import './style/select.scss'

interface Option {
    label: string
    value: unknown
}

interface SelectProps {
    options: Option[]
    defaultOpt?: Option
    onChange?: (opt: Option) => void
    zIndex?: number
}

const Select: FC<SelectProps> = ({
    options,
    defaultOpt,
    onChange,
    zIndex = 0,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOpt, setSelectedOpt] = useState<Option>(
        defaultOpt || { label: 'Select a Option', value: undefined }
    )

    return (
        <div className={`OO-select ${isOpen ? 'active' : ''}`}>
            <div
                className='display-option-container'
                onClick={() => setIsOpen(!isOpen)}
                style={{ zIndex: zIndex + options.length + 7 }}
            >
                <div className='display-option-text'>{selectedOpt.label}</div>
                <div className='display-option-icon'>
                    <MdKeyboardArrowDown
                        className={`icon ${isOpen ? 'rotate' : ''}`}
                        size={24}
                    />
                </div>
            </div>
            {options
                .filter(o => o.value !== selectedOpt.value)
                .map((opt, index) => (
                    <span
                        key={index}
                        className='option'
                        onClick={() => {
                            onChange && onChange(opt)
                            setSelectedOpt(opt)
                            setIsOpen(false)
                        }}
                        style={SelectStyle(
                            isOpen,
                            index,
                            options.length,
                            zIndex
                        )}
                    >
                        {opt.label}
                    </span>
                ))}
        </div>
    )
}

type SS = (
    isOpen: boolean,
    index: number,
    length: number,
    zIndex: number
) => CSSProperties
const SelectStyle: SS = (isOpen, index, length, zIndex) => {
    const TD = (length - 1 - index) * 200

    if (isOpen)
        return {
            top: `calc(${(index + 1) * 100}% - 15px)`,
            opacity: 1,
            pointerEvents: 'all',
            transitionDelay: `${index * 200}ms`,
            zIndex: zIndex + length - index,
        }
    else
        return {
            transitionDelay: `${TD}ms, ${TD + 100}ms`,
            zIndex: zIndex + length - index,
        }
}

export { Option as SelectOption }
export { Select }
