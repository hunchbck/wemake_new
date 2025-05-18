import type { Route } from "../../../+types/home";

export function loader({ request }: Route.LoaderArgs) {
  return {
    message: "Welcome to OnePy!"
  };
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "OnePy - 홈" },
    { name: "description", content: "OnePy 애플리케이션 홈페이지입니다." }
  ];
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">OnePy</h1>
      <p className="text-xl text-center mb-8">{loaderData.message}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">시작하기</h2>
          <p className="mb-4">새로운 프로젝트를 시작하고 관리하세요.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            새 프로젝트
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">최근 활동</h2>
          <p className="mb-4">최근에 작업한 프로젝트를 확인하세요.</p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            프로젝트 보기
          </button>
        </div>
      </div>
    </div>
  );
} 