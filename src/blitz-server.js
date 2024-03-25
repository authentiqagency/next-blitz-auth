import {
    AuthServerPlugin,
    PrismaStorage,
    simpleRolesIsAuthorized
} from '@blitzjs/auth'
import { setupBlitzServer } from '@blitzjs/next'
import { RpcServerPlugin } from '@blitzjs/rpc'
import db from '../prisma'

const { api, getBlitzContext, useAuthenticatedBlitzContext, invoke } =
    setupBlitzServer({
        plugins: [
            AuthServerPlugin({
                cookiePrefix: 'web-cookie-prefix',
                storage: PrismaStorage(db),
                isAuthorized: simpleRolesIsAuthorized
            }),
            RpcServerPlugin({})
        ]
    })

export { api, getBlitzContext, invoke, useAuthenticatedBlitzContext }
