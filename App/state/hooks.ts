import { TypedUseSelectorHook } from 'react-redux'
import { useDispatch as baseDispatch } from 'react-redux'
import { useSelector as baseSelector } from 'react-redux'

// store
import type { RootState, AppDispatch } from './store'

const useDispatch = () => baseDispatch<AppDispatch>()
const useSelector: TypedUseSelectorHook<RootState> = baseSelector

export { useDispatch, useSelector }
