"use client"

import * as React from "react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/src/components/ui/navigation-menu"
import { logoutAccount } from "@/src/actions/authUser"

export default function LogoutButton() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleLogout = () => {
        startTransition(async () => {
            await logoutAccount()
            router.refresh() // Làm mới để cập nhật lại thanh Navbar
            router.push("/login") // Đẩy về trang đăng nhập
        })
    }

    return (
        <NavigationMenuLink
            onClick={handleLogout}
            className={`${navigationMenuTriggerStyle()} cursor-pointer text-red-600`}
        >
            {isPending ? "Logging out..." : "Log out"}
        </NavigationMenuLink>
    )
}