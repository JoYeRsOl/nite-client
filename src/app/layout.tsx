import React from "react"
import styles from '@/styles/primary.module.css'
import localFont from 'next/font/local'

const Inter = localFont({
    src: '../../public/font/Inter-Variable.woff2',
    variable: '--font-inter',
    weight: '100 1000'
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html className={`${Inter.className} ${styles.html}`} lang="en">
            <body className={styles.body}>{children}</body>
        </html>
    )
}