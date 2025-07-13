function SceneInfo() {
  return (
    <div className="px-8 pt-10 pb-24 text-left max-w-xl mx-auto">
      <div className="mb-8 relative">
        <div className="text-lg leading-6 font-medium mb-1">시내버스</div>
        <div className="text-sm leading-7">
          온양온천역 신한은행 승차 - 엘크루아파트 하차
        </div>
        <div className="text-sm leading-7">350번(창암1리행)</div>
        <div className="text-sm leading-7">351번(행목2리)</div>
        <div className="text-sm leading-7">352번(창암1리행)</div>
      </div>
      <div className="mb-8 relative">
        <div className="text-lg leading-6 font-medium mb-1">셔틀버스</div>
        <div className="text-sm leading-7">
          <span className="font-semibold">12:30</span> (천안아산 KTX역 →
          모나무르)
        </div>
        <div className="text-sm leading-7">
          천안아산역 3번 출구 앞 버스정류장에서 탑승
        </div>
        <div className="text-sm leading-7">
          <span className="font-semibold">15:00</span> (모나무르 → 천안아산
          KTX역)
        </div>
        <div className="text-sm leading-7">모나무르 제 2주차장에서 탑승</div>
      </div>
    </div>
  );
}

export default SceneInfo;
