import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Card } from '@hanui/react';
import Breadcrumb from '../components/Breadcrumb';
import noticesData from '../mock/notices.json';
import { Notice } from '../types';
import './NoticeListPage.css';

const ITEMS_PER_PAGE = 10;

export default function NoticeListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const notices = noticesData as Notice[];

  // Filter notices based on search term
  const filteredNotices = useMemo(() => {
    if (!searchTerm) return notices;
    return notices.filter((notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchQuery);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbItems = [{ label: '홈', path: '/' }, { label: '공지사항' }];

  return (
    <div className="notice-list-page">
      <Breadcrumb items={breadcrumbItems} />

      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">공지사항</h1>
          <p className="page-description">
            중요한 공지사항과 소식을 확인하세요.
          </p>
        </div>

        {/* Search Form */}
        <Card className="search-card">
          <form onSubmit={handleSearch} className="search-form-inline">
            <Input
              type="search"
              placeholder="제목으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-full"
              aria-label="공지사항 검색"
            />
            <Button type="submit" variant="primary">
              검색
            </Button>
          </form>
          {searchTerm && (
            <div className="search-result-info">
              검색 결과: {filteredNotices.length}건
            </div>
          )}
        </Card>

        {/* Notices Table */}
        <Card className="table-card">
          <div className="table-responsive">
            <table className="notice-table">
              <thead>
                <tr>
                  <th scope="col" className="th-number">
                    번호
                  </th>
                  <th scope="col" className="th-title">
                    제목
                  </th>
                  <th scope="col" className="th-date">
                    등록일
                  </th>
                  <th scope="col" className="th-views">
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentNotices.length > 0 ? (
                  currentNotices.map((notice, index) => (
                    <tr key={notice.id}>
                      <td className="td-number">
                        {filteredNotices.length - startIndex - index}
                      </td>
                      <td className="td-title">
                        <Link
                          to={`/notice/${notice.id}`}
                          className="notice-link"
                        >
                          {notice.title}
                        </Link>
                      </td>
                      <td className="td-date">{notice.date}</td>
                      <td className="td-views">
                        {notice.views.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="td-empty">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="이전 페이지"
              >
                이전
              </Button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                      aria-label={`${page}페이지`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="다음 페이지"
              >
                다음
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
