// import React from 'react';
"use client";
import { useSearchParams } from 'next/navigation'


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from '@/lib/auth-client';
import { toast } from 'react-toastify';
const ResetPassForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token')
    const handleSub = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataa = Object.fromEntries(formData.entries());
        const { data, error } = await resetPassword({
            newPassword: dataa.password,
            token,
        });
        if (data) {
            toast.success("your password has been reset successfully");
        }
    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">

                <form onSubmit={handleSub} className="w-full max-w-xl space-y-6">

                    {/* Email */}
                    <Label htmlFor="password" className="text-base">
                        Password <span className="text-red-500">*</span>
                    </Label>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="h-14 rounded-xl bg-white px-4 text-base shadow-sm"
                    />



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
            </div>        </div>
    );
};

export default ResetPassForm;