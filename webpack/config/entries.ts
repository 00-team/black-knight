import { Entry } from 'webpack'

import { resolve, APP_DIR } from './path'

const Entries: Entry = {
    react_vendors: { import: ['react', 'react-dom'], runtime: 'runtime' },
    shared: {
        import: ['react-router-dom', 'jotai', '@00-team/utils'],
        dependOn: 'react_vendors',
    },

    state: {
        import: resolve(APP_DIR, 'state'),
        dependOn: ['shared'],
    },

    components: {
        import: resolve(APP_DIR, 'components'),
        dependOn: ['state'],
    },

    main: {
        import: APP_DIR,
        dependOn: ['Login', 'Dashboard'],
    },

    Login: {
        import: resolve(APP_DIR, 'Login'),
        dependOn: ['state'],
    },

    Dashboard: {
        import: resolve(APP_DIR, 'Dashboard'),
        dependOn: ['components'],
    },
}

export default Entries
