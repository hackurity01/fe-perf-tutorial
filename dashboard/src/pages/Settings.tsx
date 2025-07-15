// TODO: 최적화 전
import React, { useState, useEffect } from "react";

const initialUser = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  notifications: true,
  joinDate: "2024-01-01",
};

function Settings() {
  const [firstName, setFirstName] = useState(initialUser.firstName);
  const [lastName, setLastName] = useState(initialUser.lastName);
  const [email, setEmail] = useState(initialUser.email);
  const [notifications, setNotifications] = useState(initialUser.notifications);
  const [fullName, setFullName] = useState("");
  const [saved, setSaved] = useState(false);

  // 비효율: 파생 상태 useEffect
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  // 비효율: 저장 메시지 useEffect
  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 1500);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">설정</h1>
      <form
        className="bg-white rounded shadow p-6 flex flex-col gap-4"
        onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">성</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="notifications"
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="notifications" className="text-sm">
            알림 받기
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          저장
        </button>
        {saved && <div className="text-green-600 text-sm">저장되었습니다!</div>}
      </form>
      <div className="mt-6 bg-gray-50 rounded p-4 text-sm">
        <div>
          풀네임: <span className="font-bold">{fullName}</span>
        </div>
        <div>
          가입일: <span className="font-bold">{initialUser.joinDate}</span>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-400">
        ※ 파생 상태 useEffect, 불필요한 Effect, 폼 일괄 렌더
      </p>
    </div>
  );
}

export default Settings;
