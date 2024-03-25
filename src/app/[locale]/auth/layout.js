import { useAuthenticatedBlitzContext } from '~/blitz-server'

export default async function RootLayout({ children }) {
    await useAuthenticatedBlitzContext({
        redirectAuthenticatedTo: '/'
    })
    return <>{children}</>
}
