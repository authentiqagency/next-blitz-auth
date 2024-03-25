import { ErrorMessage } from '@hookform/error-message'
import { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

export const LabeledTextField = forwardRef(
    ({ label, outerProps, labelProps, name, ...props }, ref) => {
        const {
            register,
            formState: { isSubmitting, errors }
        } = useFormContext()

        return (
            <div {...outerProps}>
                <label {...labelProps}>
                    {label}
                    <input
                        disabled={isSubmitting}
                        {...register(name)}
                        {...props}
                    />
                </label>

                <ErrorMessage
                    render={({ message }) => (
                        <div role="alert" style={{ color: 'red' }}>
                            {message}
                        </div>
                    )}
                    errors={errors}
                    name={name}
                />
            </div>
        )
    }
)

LabeledTextField.displayName = 'LabeledTextField'

export default LabeledTextField
