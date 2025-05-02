'use client'

import NavHeader from "@/app/ui/NavHeader";

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <NavHeader />
            {children}
        </div>
    )
}