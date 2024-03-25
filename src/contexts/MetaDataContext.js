'use client'

import { createContext, useContext } from 'react'

const MetaDataContext = createContext({})

const MetaDataProvider = ({ children, metaData }) => (
    <MetaDataContext.Provider
        value={{
            ...metaData
        }}>
        {children}
    </MetaDataContext.Provider>
)

export default MetaDataProvider

export const useMetaData = () => useContext(MetaDataContext)
