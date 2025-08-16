"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import getGitHubUser from "@/http/github";
import { User } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Logo() {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    getGitHubUser("paulospiguel").then(setUser);
  }, []);

  return (
    <button onClick={() => router.push("/")}>
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={user?.avatar_url} />
          <AvatarFallback>{user?.name?.charAt(0) || "PS"}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold">{user?.name}</h3>
          <p className="text-gray-400 text-sm">Senior Full-Stack Developer</p>
        </div>
      </div>
    </button>
  );
}
