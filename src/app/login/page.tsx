"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "@/firebase/auth";
import { useAuthContext } from "@/firebase/AuthContext";

import Input from "@/components/Input";

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
      router.push("/invoices");
    }
  }, [user]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="mx-2 w-[400px] rounded  border px-8 py-12">
        {authLoading && <div>Check status login...</div>}
        <div className="pb-6 text-lg font-bold lg:text-2xl">Log In</div>
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
          className="my-4 w-full rounded bg-blue-500 px-2 py-3 text-white"
        >
          {loading ? "Loading.." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
