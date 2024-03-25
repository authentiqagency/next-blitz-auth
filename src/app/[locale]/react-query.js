'use client'

import { useQuery, useMutation } from '@blitzjs/rpc'
import logout from '../../auth/mutations/logout'
import getCurrentUser from '../../users/queries/getCurrentUser'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import useTranslations from '~/hooks/useTranslations'
import { useMetaData } from '~/contexts/MetaDataContext'

export default function Test() {
    const { locale } = useMetaData()
    const { t } = useTranslations()
    const router = useRouter()
    const [user] = useQuery(getCurrentUser, null)
    const [isPending, startTransition] = useTransition()
    const [logoutMutation] = useMutation(logout)

    return (
        <div>
            <h1>Test</h1>
            <p>locale: {locale}</p>
            <p>Translations: {t('test')}</p>
            <p>{user?.email}</p>
            <button
                className="button small"
                onClick={async () => {
                    await logoutMutation()
                    startTransition(() => {
                        // Refresh the current route and fetch new data from the server without
                        // losing client-side browser or React state.
                        router.refresh()
                    })
                }}>
                Logout
            </button>
        </div>
    )
}
