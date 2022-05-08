import { Entry } from 'webpack'

import { resolve, APP_DIR } from './path'

const Entries: Entry = {
    main: {
        import: resolve(APP_DIR, 'index.tsx'),
        dependOn: ['shared'],
    },
    shared: ['react', 'react-dom', 'react-router-dom', '@00-team/utils'],
}

export default Entries
