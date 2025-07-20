import ProgressBar from "@/components/ProgressBar";
import type { User } from "@/types";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { memo } from "react";

function UserTable({ users }: { users: User[] }) {
  return (
    <div className="border rounded shadow h-full">
      <div className="bg-gray-100 flex items-center font-semibold text-sm">
        <div className="px-3 py-2 w-16">ID</div>
        <div className="px-3 py-2 w-32">이름</div>
        <div className="px-3 py-2 w-48">이메일</div>
        <div className="px-3 py-2 w-48">평가점수</div>
        <div className="px-3 py-2 w-24">권한</div>
        <div className="px-3 py-2 w-48">주소</div>
        <div className="px-3 py-2 w-16">나이</div>
      </div>

      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height - 40}
            itemCount={users.length}
            itemSize={40}
            width={width}
            overscanCount={50}>
            {({ index, style }) => (
              <UserRow user={users[index]} style={style} />
            )}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

function UserRow({ style, user }: { user: User; style: React.CSSProperties }) {
  return (
    <div style={style} className="flex items-center border-b">
      <div className="px-3 py-1 whitespace-nowrap w-16 text-ellipsis overflow-hidden">
        {user.id}
      </div>
      <div className="px-3 py-1 whitespace-nowrap w-32 text-ellipsis overflow-hidden">
        {user.firstName} {user.lastName}
      </div>
      <div className="px-3 py-1 whitespace-nowrap w-48 text-ellipsis overflow-hidden">
        {user.email}
      </div>
      <div className="px-3 py-1 whitespace-nowrap w-48 text-ellipsis overflow-hidden">
        <ProgressBar value={user.reviewScore} />
      </div>
      <div className="px-3 py-1 whitespace-nowrap w-24 text-ellipsis overflow-hidden">
        {user.role}
      </div>
      <div className="px-3 py-1 whitespace-nowrap w-48 text-ellipsis overflow-hidden">
        {user.address}
      </div>
      <div className="px-3 py-1 whitespace-nowrap w-16 text-ellipsis overflow-hidden">
        {user.age}
      </div>
    </div>
  );
}

export default memo(UserTable);
