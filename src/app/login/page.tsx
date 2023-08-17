"use client";
import Input from "@/components/Input";
import { useAuthContext } from "@/firebase/AuthContext";
import { signIn } from "@/firebase/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user, authLoading } = useAuthContext();
  const router = useRouter();

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const onSubmitLogin = async () => {
    try {
      setLoading(true);
      await signIn(Form.email, Form.password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/flyover/invoices");
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="mx-2 w-[400px] border  py-12 px-8 rounded">
        {authLoading && <div>Check status login...</div>}
        <div className="text-lg lg:text-2xl pb-6 font-bold">Log In</div>
        <Input
          title="Email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => onChangeText(e)}
        />
        <div className="py-3"></div>
        <Input
          title="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => onChangeText(e)}
        />
        <button
          onClick={() => onSubmitLogin()}
          disabled={loading}
          className="w-full bg-blue-500 px-2 py-3 text-white rounded my-4"
        >
          {loading ? "Loading.." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
