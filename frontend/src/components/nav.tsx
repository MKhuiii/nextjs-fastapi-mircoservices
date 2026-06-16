import * as React from "react"
import Link from "next/link"
import { cookies } from "next/headers"
import { UserInfo } from "../actions/authUser"
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
    const userInfoCookie = cookieStore.get("user_info")
    let userData: UserInfo | null = null

    if (userInfoCookie?.value) {
        try {
            userData = JSON.parse(userInfoCookie.value) as UserInfo
        } catch (e) {
            console.error("Failed to parse user_info cookie:", e)
        }
    }
    return (
        <div className="flex items-center justify-between w-full px-6 py-2 border-b text-xl">
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
                                <Link href="/manage">Manage</Link>
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
                            {userData && (
                                <NavigationMenuItem className="text-sm font-medium text-muted-foreground select-none pr-2">
                                    <span className="font-semibold text-foreground text-base">{userData.username}</span>
                                </NavigationMenuItem>
                            )}
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