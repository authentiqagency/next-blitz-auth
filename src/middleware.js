//import { NextResponse } from 'next/server'
import { i18nRouter } from 'next-i18n-router'

import i18nConfig from 'i18nConfig'

export default function middlewareHandler(req) {
    return i18nRouter(req, i18nConfig)
}

// only applies this middleware to files in the app directory
export const config = {
    matcher: '/((?!api|static|.*\\..*|_next|favicon.ico|site.webmanifest).*)'
}
