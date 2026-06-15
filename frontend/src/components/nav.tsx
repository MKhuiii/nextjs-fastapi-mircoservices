import * as React from "react"
import Link from "next/link"
import { cookies } from "next/headers"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/src/components/ui/navigation-menu"
import LogoutButton from "./logout-button"

export default async function NavigationBar() {
    const cookieStore = await cookies()
    const hasAuth = cookieStore.has("user_auth")

    return (
        <div className="flex items-center justify-between w-full px-6 py-2 border-b text-xl">

            {/* BÊN TRÁI: Nút điều hướng chung */}
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {hasAuth && (
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/dashboard">Dashboard</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-2">
                    {!hasAuth ? (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/login">Login</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/register">Register</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    ) : (
                        <>
                            <NavigationMenuItem>
                                <LogoutButton />
                            </NavigationMenuItem>
                        </>
                    )}
                </NavigationMenuList>
            </NavigationMenu>

        </div>
    )
}