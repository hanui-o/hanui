import { Button, Card } from '@hanui/react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>HANUI Portal Template</h1>
        <p>KRDS 기반 민원 포털 템플릿</p>
      </header>

      <main className="main">
        <Card className="welcome-card">
          <h2>환영합니다! 🎉</h2>
          <p>
            HANUI 프로젝트가 성공적으로 생성되었습니다.
            <br />
            KRDS 디자인 시스템을 활용하여 공공 웹 서비스를 개발하세요.
          </p>

          <div className="button-group">
            <Button variant="primary" size="large">
              시작하기
            </Button>
            <Button variant="secondary" size="large">
              문서 보기
            </Button>
          </div>
        </Card>

        <div className="info-grid">
          <Card className="info-card">
            <h3>📦 컴포넌트</h3>
            <p>Button, Input, Card 등 9개의 컴포넌트 제공</p>
          </Card>

          <Card className="info-card">
            <h3>🎨 KRDS 디자인</h3>
            <p>공공 웹 디자인 시스템 완벽 지원</p>
          </Card>

          <Card className="info-card">
            <h3>⚡️ Vite</h3>
            <p>빠른 개발 환경과 최적화된 빌드</p>
          </Card>

          <Card className="info-card">
            <h3>🔧 TypeScript</h3>
            <p>타입 안전성과 개발 생산성</p>
          </Card>
        </div>
      </main>

      <footer className="footer">
        <p>
          Built with <strong>HANUI</strong> - KRDS 기반 공공 웹 UI 컴포넌트
          라이브러리
        </p>
        <div className="links">
          <a href="https://hanui.io" target="_blank" rel="noopener noreferrer">
            문서
          </a>
          <span>•</span>
          <a
            href="https://github.com/odada-o/hanui"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://uiux.egovframe.go.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            KRDS
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
