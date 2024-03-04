"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const ulrToken = window.location.search.split("=")[1];
    setToken(ulrToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center py-2">
      <h1 className="text-4x">Verify Email</h1>
      <h1 className="text-orange-300">{token ? `${token}` : "No Token"}</h1>
      {verified && (
        <div>
          Email Verified
          <Link href="/login">Please Login</Link>
        </div>
      )}

      {error && <div className="text-2xl bg-red-400">There is some error</div>}
    </div>
  );
}
