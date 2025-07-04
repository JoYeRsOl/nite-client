import Link from "next/link";
import React from "react";

export default function Page() {
    return <div>
        <h1>Welcome to Zov-client!</h1>
        <Link href="/server">Server</Link>
    </div>
}