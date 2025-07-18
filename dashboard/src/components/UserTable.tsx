import ProgressBar from "@/components/ProgressBar";
import type { User } from "@/types";

function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-auto border rounded shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">이름</th>
            <th className="px-3 py-2 text-left">이메일</th>
            <th className="px-3 py-2 text-left min-w-[200px]">평가점수</th>
            <th className="px-3 py-2 text-left">권한</th>
            <th className="px-3 py-2 text-left">주소</th>
            <th className="px-3 py-2 text-left">나이</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserRow key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({ user }: { user: User }) {
  return (
    <tr className="even:bg-gray-50">
      <td className="px-3 py-1 whitespace-nowrap">{user.id}</td>
      <td className="px-3 py-1 whitespace-nowrap">
        {user.firstName} {user.lastName}
      </td>
      <td className="px-3 py-1 whitespace-nowrap">{user.email}</td>
      <td className="px-3 py-1 whitespace-nowrap">
        <ProgressBar value={user.reviewScore} />
      </td>
      <td className="px-3 py-1 whitespace-nowrap">{user.role}</td>
      <td className="px-3 py-1 whitespace-nowrap">{user.address}</td>
      <td className="px-3 py-1 whitespace-nowrap">{user.age}</td>
    </tr>
  );
}

export default UserTable;
