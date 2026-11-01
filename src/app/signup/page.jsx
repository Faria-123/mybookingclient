
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Loader2, UserPlus } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// // import { toast } from "@/components/ui/toast";
// import { signUp } from "@/lib/auth-client";
// import { toast } from "react-toastify";



// export default function RegisterPage() {
//     const router = useRouter();

//     const [loading, setLoading] = useState(false);

//     async function handleRegister(event) {
//         event.preventDefault();

//         if (loading) return;


//         const formData = new FormData(event.currentTarget);
//         const dataa = Object.fromEntries(formData.entries());
//         // console.log(data);
//         const { data, error } = await signUp.email({
//             ...dataa
//         });
//         if (data) {
//             toast.success("Successfully registered!");
//         }
//         if (error) {
//             toast.error("Registration failed: ");
//             console.log(error);
//         }
//         setLoading(true);

//     }

//     return (
//         <section className="min-h-screen flex items-center justify-center bg-muted/40 px-4 py-12">

//             <Card className="w-full max-w-md shadow-lg">

//                 <CardHeader className="text-center space-y-2">

//                     <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
//                         <UserPlus className="size-7 text-primary" />
//                     </div>

//                     <CardTitle className="text-2xl font-bold">
//                         Create an Account
//                     </CardTitle>

//                     <CardDescription>
//                         Register now and join our book community.
//                     </CardDescription>

//                 </CardHeader>

//                 <CardContent>

//                     <form onSubmit={handleRegister} className="space-y-5">

//                         {/* Name */}
//                         <div className="space-y-2">
//                             <Label htmlFor="name">
//                                 Name
//                             </Label>

//                             <Input
//                                 id="name"
//                                 name="name"
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 required
//                             />
//                         </div>

//                         {/* Email */}
//                         <div className="space-y-2">
//                             <Label htmlFor="email">
//                                 Email
//                             </Label>

//                             <Input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 placeholder="example@gmail.com"
//                                 required
//                             />
//                         </div>

//                         {/* Photo URL */}
//                         <div className="space-y-2">
//                             <Label htmlFor="photoURL">
//                                 Photo URL
//                             </Label>

//                             <Input
//                                 id="photoURL"
//                                 name="photoURL"
//                                 type="url"
//                                 placeholder="https://example.com/photo.jpg"
//                                 required
//                             />
//                         </div>

//                         {/* Password */}
//                         <div className="space-y-2">
//                             <Label htmlFor="password">
//                                 Password
//                             </Label>

//                             <Input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 placeholder="Enter your password"
//                                 minLength={6}
//                                 required
//                             />

//                             <p className="text-xs text-muted-foreground">
//                                 Password must be at least 6 characters.
//                             </p>
//                         </div>

//                         {/* Register Button */}
//                         <Button
//                             type="submit"
//                             className="w-full"
//                             disabled={loading}
//                         >
//                             {loading && (
//                                 <Loader2 className="mr-2 size-4 animate-spin" />
//                             )}

//                             {loading ? "Registering..." : "Register"}
//                         </Button>

//                         <p className="text-center text-sm text-muted-foreground">
//                             Already have an account?{" "}
//                             <button
//                                 type="button"
//                                 onClick={() => router.push("/login")}
//                                 className="font-semibold text-primary hover:underline"
//                             >
//                                 Login
//                             </button>
//                         </p>

//                     </form>

//                 </CardContent>
//             </Card>

//         </section>
//     );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleRegister(event) {
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

            const { data, error } = await signUp.email(userData);

            if (error) {
                toast.error(error.message || "Registration failed!");
                return;
            }

            if (data) {
                toast.success("Successfully registered!");

                form.reset();

                router.push("/login");
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

                    <form onSubmit={handleRegister} className="space-y-5">

                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

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

                        {/* Photo URL */}
                        <div className="space-y-2">
                            <Label htmlFor="photoURL">Photo URL</Label>

                            <Input
                                id="photoURL"
                                name="photoURL"
                                type="url"
                                placeholder="https://example.com/photo.jpg"
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

                            {loading ? "Registering..." : "Register"}
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
                        </p>

                    </form>

                </CardContent>
            </Card>

        </section>
    );
}
