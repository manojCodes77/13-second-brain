import { Link, redirect,  useNavigation, type ActionFunction, Form } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingBar from "../utils/LoadingBar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

export default function Signup() {
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
          <h2 className="text-3xl font-bold text-gray-800">Join Your Second Brain</h2>
          <p className="mt-2 text-gray-500">
            Create an account to securely reserve and organize your important links for future updates.
          </p>
        </div>

        <Form method="post" className="space-y-4">
          <Input
            name="email"
            placeholder="Email address"
          />
          <Input
            name="password"
            placeholder="Password"
          />
          <Input
            name="confirm"
            placeholder="Confirm password"
          />
          <Button type="submit" variant="primary" text={isSubmitting ? "Signing Up..." : "Sign Up"} size="lg" disabled={isSubmitting} />
        </Form>


        <p className="text-sm text-center text-gray-500">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-indigo-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-indigo-600 hover:underline">
            Privacy Policy
          </Link>.
        </p>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}


export const signupAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  // Validation
  if (!email || !password || !confirm) {
    toast.error('Please fill in all fields.');
    return {
      error: "Please fill in all fields."
    };
  }

  if (password !== confirm) {
    toast.error('Passwords do not match.');
    return {
      error: "Passwords do not match."
    };
  }

  if (!email.includes("@")) {
    toast.error('Please enter a valid email address.');
    return {
      error: "Please enter a valid email address."
    };
  }

  try {
    await axios.post(`${BACKEND_URL}/api/v1/users/signup`, {
      email,
      password
    });
    toast.success('Signup successful. You can now sign in.!');
    return redirect("/signin");
  } catch (err: any) {
    // Extract error message from server response
    const serverMessage =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Signup failed. Please try again.";

    toast.error(serverMessage);
    return {
      error: serverMessage,
      fields: { email } // Return email to keep it filled
    };
  }
};