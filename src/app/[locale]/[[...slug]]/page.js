import Link from 'next/link'
import styles from '~/styles/Home.module.css'
import Test from './../react-query'
import { useAuthenticatedBlitzContext } from '~/blitz-server'

export default async function Home({ params }) {
    await useAuthenticatedBlitzContext({
        redirectTo: '/auth/login'
    })

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%'
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                <Link href={'/auth/signup'} className={styles.button}>
                    <strong>Sign Up</strong>
                </Link>
                <Link href={'/auth/login'} className={styles.loginButton}>
                    <strong>Login</strong>
                </Link>
                <p>Client Session</p>
                <Test />
            </div>
        </div>
    )
}
