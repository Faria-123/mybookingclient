
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "@/lib/auth-client";
import { toast } from "react-toastify";


export default function LoginForm() {


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dataa = Object.fromEntries(formData.entries());

        const { data, error } = await requestPasswordReset({
            email: dataa.email,
            redirectTo: "/reset-pass",
        });

        if (error) {
            toast.error(error.message);
            console.log(error);
            return;
        }

        toast.success("An email has been sent to your email address!");

        console.log(data);
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">

            <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">
                        Email <span className="text-red-500">*</span>
                    </Label>

                    {/* <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="h-14 rounded-xl bg-white px-4 text-base shadow-sm"
                    /> */}

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-14 rounded-xl bg-white px-4 text-base shadow-sm"
                    />
                </div>



                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        type="submit"
                        className="h-11 rounded-full bg-blue-500 px-7 text-base hover:bg-blue-600"
                    >
                        ✓ Submit
                    </Button>

                    <Button
                        type="reset"
                        variant="secondary"
                        className="h-11 rounded-full px-7 text-base"
                    >
                        Reset
                    </Button>
                </div>

            </form>
        </div>
    );
}
