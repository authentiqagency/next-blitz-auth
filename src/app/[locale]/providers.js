'use client'

import TranslationsProvider from '../../contexts/TranslationsContext'
import MetaDataProvider from '../../contexts/MetaDataContext'

export const Providers = ({ translations, metaData, locale, children }) => (
    <TranslationsProvider
        namespaces={['core']}
        locale={locale}
        resources={translations}>
        <MetaDataProvider metaData={metaData}>{children}</MetaDataProvider>
    </TranslationsProvider>
)
