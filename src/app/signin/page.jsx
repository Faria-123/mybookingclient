"use client";
import { Loader2, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    async function handleSignIn(event) {
        event.preventDefault();

        if (loading) return;

        const form = event.currentTarget;
        const formData = new FormData(form);

        const formValues = Object.fromEntries(formData.entries());

        const userData = {
            name: formValues.name,
            email: formValues.email,
            image: formValues.photoURL,
            password: formValues.password,
        };

        try {
            setLoading(true);

            const { data, error } = await signIn.email(userData);

            if (error) {
                toast.error(error.message || "signIn failed!");
                return;
            }

            if (data) {
                toast.success("Successfully signed in!");

                form.reset();

                router.push("/");
            }

        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }
    return (
        <section className="min-h-screen flex items-center justify-center bg-muted/40 px-4 py-12">

            <Card className="w-full max-w-md shadow-lg">

                <CardHeader className="text-center space-y-2">

                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
                        <UserPlus className="size-7 text-primary" />
                    </div>

                    <CardTitle className="text-2xl font-bold">
                        Create an Account
                    </CardTitle>

                    <CardDescription>
                        Register now and join our book community.
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <form onSubmit={handleSignIn} className="space-y-5">



                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                required
                            />
                        </div>



                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                minLength={6}
                                required
                            />

                            <p className="text-xs text-muted-foreground">
                                Password must be at least 6 characters.
                            </p>
                        </div>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading && (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                            )}

                            {loading ? "loging In..." : "login"}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}

                            <button
                                type="button"
                                onClick={() => router.push("/login")}
                                className="font-semibold text-primary hover:underline"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/forgot-pass")}
                                className="font-semibold text-primary hover:underline"
                            >
                                forget password!
                            </button>
                        </p>

                    </form>

                </CardContent>
            </Card>

        </section>
    );
};

export default page;