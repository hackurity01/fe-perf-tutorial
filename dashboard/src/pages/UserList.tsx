import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/data/mockData";
import ProgressBar from "@/components/ProgressBar";
import type { User } from "@/types";

const roles = ["All", "Admin", "Manager", "User", "Guest"];

function UserList() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");
  const [filtered, setFiltered] = useState<User[]>([]);

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  useEffect(() => {
    if (!users) return;

    setFiltered(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [users, query, role]);

  return (
    <div className="max-w-7xl mx-auto p-6">
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
      <div className="overflow-auto border rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">이름</th>
              <th className="px-3 py-2 text-left">이메일</th>
              <th className="px-3 py-2 text-left w-[200px]">평가점수</th>
              <th className="px-3 py-2 text-left">권한</th>
              <th className="px-3 py-2 text-left">주소</th>
              <th className="px-3 py-2 text-left">나이</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="even:bg-gray-50">
                <td className="px-3 py-1 whitespace-nowrap">{u.id}</td>
                <td className="px-3 py-1 whitespace-nowrap">{u.name}</td>
                <td className="px-3 py-1 whitespace-nowrap">{u.email}</td>
                <td className="px-3 py-1 whitespace-nowrap">
                  <ProgressBar value={u.reviewScore} />
                </td>
                <td className="px-3 py-1 whitespace-nowrap">{u.role}</td>
                <td className="px-3 py-1 whitespace-nowrap">{u.address}</td>
                <td className="px-3 py-1 whitespace-nowrap">{u.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-gray-400">
        ※ 5,000명 전체 DOM 렌더 (가상화 미적용)
      </p>
    </div>
  );
}

export default UserList;
