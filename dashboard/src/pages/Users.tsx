import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/data/mockData";
import type { User } from "@/types";
import UserTable from "@/components/UserTable";

const roles = ["All", "Admin", "Manager", "User", "Guest"];

function Users() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const filtered =
    users?.filter((u) => {
      return (
        u.firstName.toLowerCase().includes(query.toLowerCase()) ||
        u.lastName.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
      );
    }) ?? [];

  return (
    <div className="max-w-7xl mx-auto h-full p-6 flex flex-col">
      <div>
        <h1 className="text-2xl font-bold mb-6">사용자 목록</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            className="border rounded px-3 py-2 w-full md:w-64"
            placeholder="검색 (이름, 이메일)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 w-full md:w-48"
            value={role}
            onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <span className="text-gray-500 self-center">
            {isLoading ? "로딩 중..." : `총 ${filtered.length}명`}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <UserTable users={filtered} />
      </div>
      <p className="mt-4 text-xs text-gray-400">
        ※ 5,000명 전체 DOM 렌더 (가상화 미적용)
      </p>
    </div>
  );
}

export default Users;
