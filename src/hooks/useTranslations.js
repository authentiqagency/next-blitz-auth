'use client'

import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function useTranslations() {
    const path = usePathname()

    const regex = /^\/(ro)(\/.*)?$/
    const locale = regex.test(path) ? 'ro' : 'de'

    return useTranslation(null, { lng: locale })
}

export default useTranslations
