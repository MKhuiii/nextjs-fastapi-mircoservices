'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const BACKEND_URL = process.env.NEXT_PUBLIC_USER_BACKEND_URL

export interface ActionResponse {
    success: boolean
    message: string
}

export interface UserInfo {
    user_id: string
    username: string
    email: string
}

export async function registerAccount(formData: FormData): Promise<ActionResponse> {
    try {
        const username = formData.get('username')?.toString().trim()
        const email = formData.get('email')?.toString().trim()
        const pwd = formData.get('pwd')?.toString().trim()
        const repwd = formData.get('repwd')?.toString().trim()
        if (!username || !email || !pwd || !repwd) {
            return {
                success: false,
                message: "Please fill in all required fields"
            }
        }
        if (pwd !== repwd) {
            return {
                success: false,
                message: "Passwords do not match"
            }
        }

        const res = await fetch(`${BACKEND_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": pwd
            })
        })
        const data = (await res.json()) as { detail?: string }
        if (!res.ok) {
            return {
                success: false,
                message: data.detail || 'Registration failed'
            }
        }
        return {
            success: true,
            message: 'Account registered successfully'
        }
    }
    catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'An error occurred on the backend server'
        }
    }
}

export async function loginUser(formData: FormData): Promise<ActionResponse> {
    let isSuccess = false
    try {
        const email = formData.get("email")?.toString().trim()
        const pwd = formData.get("pwd")?.toString().trim()
        const res = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": pwd
            })
        })
        const data = (await res.json()) as { access_token?: string, detail?: string, user?: UserInfo }
        if (!res.ok) {
            return {
                success: false,
                message: data.detail || 'Email or password is wrong'
            }
        }
        const cookieStore = await cookies()

        cookieStore.set('user_auth', data.access_token!, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24,
            path: '/',
        })
        if (data.user) {
            cookieStore.set('user_info', JSON.stringify(data.user), {
                httpOnly: false,
                secure: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24,
                path: '/',
            })
        }
        revalidatePath('/', 'layout')
        isSuccess = true
    }
    catch (error) {
        return {
            success: false,
            message: 'An error occurred on the backend server'
        }
    }
    if (isSuccess) {
        redirect('/manage')
    }
    return {
        success: false,
        message: 'Login failed unexpectedly.'
    }
}

export async function logoutAccount() {
    const cookieStore = await cookies()
    cookieStore.delete('user_auth')
    cookieStore.delete('user_info')

    return { success: true, message: 'Logged out successfully.' }
}