// TODO: 최적화 전
import React, { useState, useEffect } from "react";

const initialUser = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  notifications: true,
  joinDate: "2024-01-01",
};

function verySlowHash(str: string): number[] {
  // 일부러 느리게: 문자열을 1000번 해시, 중간에 불필요한 연산 추가
  const arr = Array(16).fill(0);
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < str.length; j++) {
      arr[j % 16] = (arr[j % 16] * 31 + str.charCodeAt(j) + i) % 256;
      // 불필요한 연산
      for (let k = 0; k < 10; k++) {
        arr[j % 16] = (arr[j % 16] + Math.floor(Math.sqrt(i + k + 1))) % 256;
      }
    }
  }
  // 인위적 지연
  const start = Date.now();
  while (Date.now() - start < 50) {
    // busy wait for 100ms
  }

  return arr;
}

function verySlowDrawHashImage(ctx: CanvasRenderingContext2D, hash: number[]) {
  // identicon 스타일: 16x16 격자, 좌우 대칭, 해시 기반 색상
  const grid = 8;
  const cell = 25; // 8*25=200
  // 색상 추출 (해시 일부)
  const r = hash[0],
    g = hash[1],
    b = hash[2];
  const bgR = hash[3],
    bgG = hash[4],
    bgB = hash[5];
  // 배경
  ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
  ctx.fillRect(0, 0, 200, 200);
  // 패턴 그리기 (좌우 대칭, 느리게)
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < Math.ceil(grid / 2); x++) {
      // 매우 느리게: 반복 연산 증가
      let v = hash[(x + y * grid) % hash.length];
      for (let i = 0; i < 5000; i++) {
        v = (v + Math.floor(Math.sqrt(i + x + y + (v % 13)))) % 256;
        v = (v * 31 + (i % 7)) % 256;
      }
      // 패턴 결정: v가 180 이상이면 칠함 (더 희소하게)
      if (v > 180) {
        // 색상도 느리게 계산
        let rr = r,
          gg = g,
          bb = b;
        for (let j = 0; j < 100; j++) {
          rr = (rr * 13 + v + j) % 256;
          gg = (gg * 17 + v - j) % 256;
          bb = (bb * 19 + v + j * 2) % 256;
        }
        ctx.fillStyle = `rgb(${rr},${gg},${bb})`;
        ctx.fillRect(x * cell, y * cell, cell, cell);
        // 대칭
        ctx.fillRect((grid - 1 - x) * cell, y * cell, cell, cell);
      }
    }
  }
  // 중앙에 이니셜(첫글자) 추가 (느리게)
  ctx.font = "bold 36px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = `rgba(255,255,255,0.7)`;
  ctx.fillText(String.fromCharCode(65 + (hash[6] % 26)), 100, 100);
}

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

  // 매우 느리고 복잡한 해시 이미지 생성 useEffect
  useEffect(() => {
    const canvas = document.getElementById(
      "profile-canvas"
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // 일부러 느리게: 여러 번 해시를 합침
    let hash = verySlowHash(firstName + lastName + email);
    for (let i = 0; i < 5; i++) {
      hash = verySlowHash(hash.join(":"));
    }
    // 인위적 지연
    verySlowDrawHashImage(ctx, hash);
  }, [firstName, lastName, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">설정</h1>
      <canvas id="profile-canvas" width="200" height="200" className="m-auto" />
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
