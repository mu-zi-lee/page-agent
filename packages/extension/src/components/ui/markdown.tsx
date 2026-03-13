import type { ComponentPropsWithoutRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'

type MarkdownTextProps = {
	content: string
	className?: string
	compact?: boolean
}

export function MarkdownText({ content, className, compact = false }: MarkdownTextProps) {
	if (!content.trim()) return null

	return (
		<div
			className={cn(
				'markdown-body text-sm leading-6 text-foreground/85',
				compact && 'text-[11px] leading-5',
				className
			)}
		>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					a: ({ className: linkClassName, ...props }) => (
						<a
							{...props}
							target="_blank"
							rel="noreferrer noopener"
							className={cn(
								'font-medium text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70',
								linkClassName
							)}
						/>
					),
					blockquote: ({ className: blockquoteClassName, ...props }) => (
						<blockquote
							{...props}
							className={cn(
								'my-2 border-l-2 border-border pl-3 italic text-muted-foreground',
								blockquoteClassName
							)}
						/>
					),
					code: ({ className: codeClassName, children, ...props }) => {
						const childArray = Array.isArray(children) ? children : [children]
						const contentText = childArray.join('').replace(/\n$/, '')
						const isBlock = codeClassName?.includes('language-') || contentText.includes('\n')

						if (!isBlock) {
							return (
								<code
									{...(props as ComponentPropsWithoutRef<'code'>)}
									className={cn(
										'rounded bg-muted px-1 py-0.5 font-mono text-[0.95em] text-foreground',
										codeClassName
									)}
								>
									{contentText}
								</code>
							)
						}

						return (
							<code
								{...(props as ComponentPropsWithoutRef<'code'>)}
								className={cn(
									'block whitespace-pre-wrap break-words font-mono text-[0.95em] text-foreground',
									codeClassName
								)}
							>
								{contentText}
							</code>
						)
					},
					h1: ({ className: headingClassName, ...props }) => (
						<h1
							{...props}
							className={cn('mt-3 mb-2 text-base font-semibold text-foreground', headingClassName)}
						/>
					),
					h2: ({ className: headingClassName, ...props }) => (
						<h2
							{...props}
							className={cn('mt-3 mb-2 text-sm font-semibold text-foreground', headingClassName)}
						/>
					),
					h3: ({ className: headingClassName, ...props }) => (
						<h3
							{...props}
							className={cn('mt-3 mb-1.5 text-xs font-semibold text-foreground', headingClassName)}
						/>
					),
					li: ({ className: itemClassName, ...props }) => (
						<li {...props} className={cn('ml-4 pl-1', itemClassName)} />
					),
					ol: ({ className: listClassName, ...props }) => (
						<ol {...props} className={cn('my-2 list-decimal space-y-1', listClassName)} />
					),
					p: ({ className: paragraphClassName, ...props }) => (
						<p
							{...props}
							className={cn('mb-2 whitespace-pre-wrap last:mb-0', paragraphClassName)}
						/>
					),
					pre: ({ className: preClassName, ...props }) => (
						<pre
							{...props}
							className={cn(
								'my-2 overflow-x-auto rounded-md border bg-background/70 p-2',
								preClassName
							)}
						/>
					),
					strong: ({ className: strongClassName, ...props }) => (
						<strong {...props} className={cn('font-semibold text-foreground', strongClassName)} />
					),
					table: ({ className: tableClassName, ...props }) => (
						<div className="my-2 overflow-x-auto">
							<table
								{...props}
								className={cn('w-full min-w-max border-collapse text-left', tableClassName)}
							/>
						</div>
					),
					td: ({ className: cellClassName, ...props }) => (
						<td
							{...props}
							className={cn('border border-border px-2 py-1 align-top', cellClassName)}
						/>
					),
					th: ({ className: cellClassName, ...props }) => (
						<th
							{...props}
							className={cn(
								'border border-border bg-muted/60 px-2 py-1 font-medium text-foreground',
								cellClassName
							)}
						/>
					),
					ul: ({ className: listClassName, ...props }) => (
						<ul {...props} className={cn('my-2 list-disc space-y-1', listClassName)} />
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	)
}
