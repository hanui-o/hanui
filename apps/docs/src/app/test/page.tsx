import { Footer, Header, SideNavigation } from '@hanui/react';

export default function TestPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <SideNavigation title="SideNavigation" sections={[]} />
        <div className="p-8">
          <h1 className="text-2xl font-bold">Header 테스트 페이지</h1>
          <p className="mt-4">
            위의 Header 컴포넌트가 정상적으로 표시되는지 확인하세요.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
