'use client'

import { useState, useTransition } from "react"
import { Button } from "@/src/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { loginUser } from "@/src/actions/authUser"
export default function LoginPage() {
    const [msg, setMsg] = useState<{ success: boolean, text: string } | null>(null)
    const [isPending, startTransition] = useTransition()


    async function loginAction(formData: FormData) {
        setMsg(null)
        startTransition(async () => {
            const res = await loginUser(formData)
            setMsg({ success: res.success, text: res.message })
        })
    }
    return (
        <>
            <div className="max-w-full flex justify-center m-8">
                <form action={loginAction} className="flex flex-col justify-items-center-safe w-lg border-2 p-4 rounded-2xl">
                    <FieldGroup>
                        <FieldSet>
                            <p className="text-center text-2xl font-bold">Login</p>
                            {msg && (
                                <p className={`text-center text-sm font-medium p-2 rounded mb-4 ${msg.success ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                                    }`}>
                                    {msg.text}
                                </p>
                            )}
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="Email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        disabled={isPending}
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="pwd">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        id="pwd"
                                        name="pwd"
                                        type="password"
                                        placeholder="*********"
                                        disabled={isPending}
                                        required
                                    />
                                </Field>
                                <Field orientation="horizontal" className="flex gap-2 justify-center">
                                    <Button type="submit" disabled={isPending}>
                                        {isPending ? "Loading..." : "Login"}
                                    </Button>
                                    <Button type="reset" variant="outline" disabled={isPending}>
                                        Cancel
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                </form>
            </div>
        </>
    )
}