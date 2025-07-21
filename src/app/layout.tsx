import React from "react"
import styles from '@/styles/primary.module.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html className={styles.html} lang="en">
            <body className={styles.body}>{children}</body>
        </html>
    )
}