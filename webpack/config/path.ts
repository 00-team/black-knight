import { resolve } from 'path'

const BASE_DIR = resolve(__dirname, '../../')
const APP_DIR = resolve(BASE_DIR, 'App')
const BLACK_NIGHT = resolve(BASE_DIR, 'black_night')
const DIST_DIR = resolve(BLACK_NIGHT, 'static/dist')

export { BASE_DIR, APP_DIR, DIST_DIR, BLACK_NIGHT, resolve }
