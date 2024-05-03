import { cn } from "@/lib/utils";
import { forwardRef } from "react";
// Interface for Button props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // Add any additional props you want to support for the Button component
    // For example:
    // variant?: 'primary' | 'secondary' | 'outline';
}

// Button component using forwardRef
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    className,
    type = 'button',
    disabled,
    ...props
}, ref) => {
    return (
        <button ref={ref}
            className={cn('w-auto bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed text-white disabled:opacity-50 hover:opacity-75 font-semibold transition',
                className
            )}>
            {children}
        </button>
    )
})

export default Button

Button.displayName = 'Button'