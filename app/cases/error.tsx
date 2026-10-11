"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="p-8">
      <p>작업사례를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>
      <button onClick={reset} className="mt-4 underline">
        다시 불러오기
      </button>
    </div>
  );
}
