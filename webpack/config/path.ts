import { resolve } from 'path'

const BASE_DIR = resolve(__dirname, '../../')
const APP_DIR = resolve(BASE_DIR, 'App')
const black_knight = resolve(BASE_DIR, 'black_knight')
const DIST_DIR = resolve(black_knight, 'static/black_knight/dist/')

export { BASE_DIR, APP_DIR, DIST_DIR, black_knight, resolve }
