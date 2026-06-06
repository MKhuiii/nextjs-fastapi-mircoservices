import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import NavigationBar from "@/components/ui/nav"
export default function RegisterPage() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <div className="max-w-full flex justify-center m-8">
                <form method="POST" className="flex flex-col justify-items-center-safe w-lg border-2 p-4 rounded-2xl">
                    <FieldGroup>
                        <FieldSet>
                            <p className="text-center text-2xl font-bold">Sign In</p>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="username">
                                        Username
                                    </FieldLabel>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="Email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="pwd">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        id="pwd"
                                        type="password"
                                        placeholder="*********"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="repwd">
                                        Retype password
                                    </FieldLabel>
                                    <Input
                                        id="repwd"
                                        type="password"
                                        placeholder="*********"
                                        required
                                    />
                                </Field>
                                <Field orientation="horizontal" className="flex gap-2 justify-center">
                                    <Button type="submit">Submit</Button>
                                    <Button type="reset" variant="outline">
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
