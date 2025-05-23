import { Form, Link, redirect, useNavigation, type ActionFunction } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axios from "axios";
import LoadingBar from "../utils/LoadingBar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

export default function Signin() {
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500 p-6">
            {
                isSubmitting && (
                    <LoadingBar />
                )
            }
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="mt-2 text-gray-500">
                        Sign in to access your reserved links and manage your second brain.
                    </p>
                </div>

                <Form method="post" className="space-y-4">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email address"
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        text={isSubmitting ? "Signing In..." : "Sign In"}
                        size="lg"
                        disabled={isSubmitting}
                    />
                </Form>

                <div className="flex justify-between text-sm text-gray-500">
                    <Link to="/forgot-password" className="hover:underline">
                        Forgot Password?
                    </Link>
                    <Link to="/signup" className="text-indigo-600 hover:underline">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}

export const signinAction: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validation
    if (!email || !password) {
        toast.error('Please fill in both email and password.');
        return {
            error: "Please fill in both email and password."
        };
    }

    if (!email.includes("@")) {
        toast.error('Please enter a valid email address.');
        return {
            error: "Please enter a valid email address."
        };
    }

    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/users/login`, {
            email,
            password
        });
        localStorage.setItem("token", response.data.token);
        toast.success('Login successful!');
        return redirect("/");
    } catch (err: any) {
        // Extract error message from server response
        const serverMessage =
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Sign in failed. Please try again.";

        toast.error(serverMessage);
        return {
            error: serverMessage,
            fields: { email } // Return email to keep it filled
        };
    }
};