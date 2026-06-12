/**
 * FundOS UI — Input & Textarea
 * Source of truth: FRONTEND_DESIGN_SYSTEM.md § 3.2 Form System
 */
import * as React from 'react'
import { cn } from '../../lib/utils'

const inputBase = [
  'w-full rounded-md border border-[--color-border] bg-[--color-surface]',
  'text-sm text-[--color-text] placeholder:text-[--color-text-disabled]',
  'px-3 py-2',
  'transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]',
  'hover:border-[--color-border-2]',
  'focus-visible:outline-none focus-visible:border-[--color-primary] focus-visible:shadow-[--shadow-focus-primary]',
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[--color-surface-2]',
  'read-only:bg-[--color-surface-2]',
].join(' ')

const inputError = [
  'border-[--color-danger]',
  'focus-visible:border-[--color-danger] focus-visible:shadow-[--shadow-focus-danger]',
].join(' ')

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftElement, rightElement, ...props }, ref) => {
    if (leftElement || rightElement) {
      return (
        <div className="relative flex items-center">
          {leftElement && (
            <span className="absolute left-3 text-[--color-text-tertiary] pointer-events-none">
              {leftElement}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              inputBase,
              error && inputError,
              leftElement && 'pl-9',
              rightElement && 'pr-9',
              className
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 text-[--color-text-tertiary]">
              {rightElement}
            </span>
          )}
        </div>
      )
    }

    return (
      <input
        ref={ref}
        className={cn(inputBase, error && inputError, className)}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(inputBase, 'resize-y min-h-[80px]', error && inputError, className)}
      {...props}
    />
  )
)
Texarea.displayName = 'Textarea'
