import { LabeledTextField } from '../../core/components/LabeledTextField'
import { Form, FORM_ERROR } from '../../core/components/Form'
import signup from '../mutations/signup'
import { Signup } from '../validations'
import { useMutation } from '@blitzjs/rpc'
import { startTransition } from 'react'
import { useRouter } from 'next/navigation'

export const SignupForm = (props) => {
    const [signupMutation] = useMutation(signup)
    const router = useRouter()

    return (
        <div>
            <h1>Create an Account</h1>

            <Form
                submitText="Create Account"
                schema={Signup}
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                    try {
                        await signupMutation(values)
                        props.onSuccess?.()
                        startTransition(() => {
                            // Refresh the current route and fetch new data from the server without
                            // losing client-side browser or React state.
                            router.refresh()
                        })
                    } catch (error) {
                        if (
                            error.code === 'P2002' &&
                            error.meta?.target?.includes('email')
                        ) {
                            // Error "P2002" comes from Prisma (https://www.prisma.io/docs/reference/api-reference/error-reference#p2002)
                            return { email: 'This email is already being used' }
                        } else {
                            return { [FORM_ERROR]: error.toString() }
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
            </Form>
        </div>
    )
}

export default SignupForm
