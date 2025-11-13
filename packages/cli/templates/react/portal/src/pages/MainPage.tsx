import { Link } from 'react-router-dom';
import { Button, Card } from '@hanui/react';
import Breadcrumb from '../components/Breadcrumb';
import noticesData from '../mock/notices.json';
import { Notice } from '../types';
import './MainPage.css';

export default function MainPage() {
  const notices = noticesData as Notice[];
  const recentNotices = notices.slice(0, 5);

  const breadcrumbItems = [{ label: '홈' }];

  return (
    <div className="main-page">
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">민원포털에 오신 것을 환영합니다</h1>
          <p className="hero-description">
            시민 여러분의 목소리에 귀 기울이겠습니다.
            <br />
            빠르고 편리한 민원 서비스를 이용하세요.
          </p>
          <div className="hero-actions">
            <Link to="/civil-complaint">
              <Button variant="primary" size="lg">
                민원 신청하기
              </Button>
            </Link>
            <Link to="/notice">
              <Button variant="secondary" size="lg">
                공지사항 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <div className="page-container">
          <h2 className="section-title">주요 서비스</h2>
          <div className="quick-links-grid">
            <Card className="quick-link-card">
              <div className="quick-link-icon">📝</div>
              <h3>민원 신청</h3>
              <p>온라인으로 간편하게 민원을 신청하세요</p>
              <Link to="/civil-complaint" className="card-link">
                바로가기
              </Link>
            </Card>

            <Card className="quick-link-card">
              <div className="quick-link-icon">🔍</div>
              <h3>민원 조회</h3>
              <p>신청한 민원의 처리 현황을 확인하세요</p>
              <a href="#inquiry" className="card-link">
                바로가기
              </a>
            </Card>

            <Card className="quick-link-card">
              <div className="quick-link-icon">📢</div>
              <h3>공지사항</h3>
              <p>중요한 공지와 소식을 확인하세요</p>
              <Link to="/notice" className="card-link">
                바로가기
              </Link>
            </Card>

            <Card className="quick-link-card">
              <div className="quick-link-icon">❓</div>
              <h3>자주 묻는 질문</h3>
              <p>궁금한 사항을 빠르게 확인하세요</p>
              <a href="#faq" className="card-link">
                바로가기
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Notices Section */}
      <section className="recent-notices-section">
        <div className="page-container">
          <div className="section-header">
            <h2 className="section-title">최근 공지사항</h2>
            <Link to="/notice" className="view-all-link">
              전체보기
            </Link>
          </div>

          <Card className="notices-card">
            <ul className="notices-list">
              {recentNotices.map((notice) => (
                <li key={notice.id} className="notice-item">
                  <Link
                    to={`/notice/${notice.id}`}
                    className="notice-item-link"
                  >
                    <span className="notice-title">{notice.title}</span>
                    <span className="notice-date">{notice.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="page-container">
          <h2 className="section-title">민원 처리 현황</h2>
          <div className="statistics-grid">
            <Card className="stat-card">
              <div className="stat-value">45,328</div>
              <div className="stat-label">총 접수 건수</div>
            </Card>
            <Card className="stat-card">
              <div className="stat-value">98.7%</div>
              <div className="stat-label">처리 완료율</div>
            </Card>
            <Card className="stat-card">
              <div className="stat-value">5.2일</div>
              <div className="stat-label">평균 처리 기간</div>
            </Card>
            <Card className="stat-card">
              <div className="stat-value">4.3/5.0</div>
              <div className="stat-label">만족도</div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
