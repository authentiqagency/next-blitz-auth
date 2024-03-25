'use client'

import { useMutation } from '@blitzjs/rpc'
import { AuthenticationError } from 'blitz'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FORM_ERROR, Form } from '../../core/components/Form'
import { LabeledTextField } from '../../core/components/LabeledTextField'
import login from '../mutations/login'
import { Login } from '../validations'

export const LoginForm = (props) => {
    const [loginMutation] = useMutation(login)
    const router = useRouter()
    return (
        <div>
            <h1>Login</h1>

            <Form
                submitText="Login"
                schema={Login}
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                    try {
                        const user = await loginMutation(values)
                        props.onSuccess?.(user)
                        startTransition(() => {
                            // Refresh the current route and fetch new data from the server without
                            // losing client-side browser or React state.
                            router.refresh()
                        })
                    } catch (error) {
                        if (error instanceof AuthenticationError) {
                            return {
                                [FORM_ERROR]:
                                    'Sorry, those credentials are invalid'
                            }
                        } else {
                            return {
                                [FORM_ERROR]:
                                    'Sorry, we had an unexpected error. Please try again. - ' +
                                    error.toString()
                            }
                        }
                    }
                }}>
                <LabeledTextField
                    name="email"
                    label="Email"
                    placeholder="Email"
                />
                <LabeledTextField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                />
                <div>
                    <a>Forgot your password?</a>
                </div>
            </Form>

            <div style={{ marginTop: '1rem' }}>
                Or <Link href={'/auth/signup'}>Sign Up</Link>
            </div>
        </div>
    )
}

export default LoginForm
