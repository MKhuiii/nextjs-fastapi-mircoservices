'use server'

import { revalidatePath } from 'next/cache'

export interface ActionResponse {
    success: boolean
    message: string
}

export async function registerAccount(formData: FormData): Promise<ActionResponse> {
    try {
        const username = formData.get('username')?.toString().trim()
        const email = formData.get('email')?.toString().trim()
        const pwd = formData.get('pwd')?.toString().trim()
        const repwd = formData.get('repwd')?.toString().trim()
        //Checking required fields
        if (!username || !email || !pwd || !repwd) {
            return {
                success: false,
                message: "Please fill in all required fields"
            }
        }
        //Checking password matched or no?
        if (pwd !== repwd) {
            return {
                success: false,
                message: "Passwords do not match"
            }
        }

        const res = await fetch('http://127.0.0.1:8000/register', {
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