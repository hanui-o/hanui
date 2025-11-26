export default function TestPage() {
  // 검색 필터 데이터
  const searchFilters = [
    {
      type: 'select' as const,
      id: 'hostName',
      label: '서버명',
      options: [
        { value: '', label: '전체' },
        { value: 'iDAMCIMST01', label: 'iDAMCIMST01' },
        { value: 'iDAMCIMST02', label: 'iDAMCIMST02' },
      ],
    },
    {
      type: 'select' as const,
      id: 'eventType',
      label: '최종상태',
      options: [
        { value: '', label: '전체' },
        { value: 'LOGIN', label: 'LOGIN' },
        { value: 'LOGOUT', label: 'LOGOUT' },
        { value: 'LOGOUT_MCI', label: 'LOGOUT_MCI' },
      ],
    },
    {
      type: 'input' as const,
      id: 'accessPublicIp',
      label: '접속 공인IP',
      placeholder: '접속 공인IP',
    },
    {
      type: 'input' as const,
      id: 'userId',
      label: '사용자ID',
      placeholder: '사용자ID',
    },
  ];

  // 버튼 데이터
  const buttons = [
    { id: 'searchBtn', label: '검색' },
    { id: 'refreshBtn', label: '새로고침' },
  ];

  // 테이블 컬럼 데이터
  const tableColumns = [
    { key: 'user_id', label: '사용자ID' },
    { key: null, label: 'Zone 0' },
    { key: 'hostname', label: '서버명', sortable: true },
    { key: 'login_time', label: '접속시간' },
    { key: 'logout_time', label: '종료시간' },
    { key: 'event_type', label: '최종상태' },
    { key: null, label: '공인IP' },
    { key: null, label: '세션 차단' },
  ];

  // 테이블 데이터 (예시)
  const tableData = [
    {
      userId: 'minki6',
      zone: '-',
      hostname: 'iDAMCIAGT01',
      loginTime: '-',
      logoutTime: '2025-11-07 22:52:02.317',
      eventType: 'LOGOUT_MCI',
      publicIp: '112.218.163.245',
    },
  ];

  // 탭 데이터
  const tabs = [
    { id: 1, label: '탭 1', href: '#', active: false },
    { id: 2, label: '탭 2 (활성)', href: '#', active: true },
    { id: 3, label: '탭 3', href: '#', active: false },
  ];

  return (
    <div>
      {/* 테이블 영역 */}
      <div>
        {/* 검색 영역 */}
        <div className="my-2.5 mb-5">
          <span>조회기간</span>
          <input
            type="text"
            id="startDate"
            className="ml-1.5 w-[150px]"
            disabled
          />
          <span className="mx-1.5">~</span>
          <input
            type="text"
            id="endDate"
            className="ml-1.5 w-[150px]"
            disabled
          />

          {/* 동적 필터 렌더링 */}
          {searchFilters.map((filter) => (
            <span key={filter.id}>
              <span className="ml-2.5">{filter.label}</span>
              {filter.type === 'select' ? (
                <select id={filter.id} className="ml-1.5 w-[130px]">
                  {filter.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id={filter.id}
                  placeholder={filter.placeholder}
                  className="ml-1.5 w-[150px]"
                />
              )}
            </span>
          ))}

          {/* 버튼 렌더링 */}
          {buttons.map((button) => (
            <button
              key={button.id}
              type="button"
              id={button.id}
              className="ml-1.5 w-20"
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* 테이블 영역 */}
        <div id="tableDiv">
          <table id="customTable" className="w-full border border-collapse">
            <thead>
              <tr>
                {tableColumns.map((column, index) => (
                  <th
                    key={index}
                    data-key={column.key || undefined}
                    className="border px-4 py-2"
                  >
                    {column.label}
                    {column.sortable && (
                      <button
                        className="ml-2 px-2 py-1"
                        data-key={column.key || undefined}
                      >
                        정렬
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody id="resultTbody">
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border px-4 py-2">{row.userId}</td>
                  <td className="border px-4 py-2">{row.zone}</td>
                  <td className="border px-4 py-2">{row.hostname}</td>
                  <td className="border px-4 py-2">{row.loginTime}</td>
                  <td className="border px-4 py-2">{row.logoutTime}</td>
                  <td className="border px-4 py-2">{row.eventType}</td>
                  <td className="border px-4 py-2">{row.publicIp}</td>
                  <td className="border px-4 py-2">
                    <button className="px-3 py-1">차단</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="pagination"></div>
      </div>

      {/* 메뉴 영역 - Navigation Tabs */}
      <div>
        {/* Tab Navigation Bar */}
        <div
          id="tabs"
          className="flex items-center gap-0 h-11 px-2 bg-black/[0.02] border border-[#dcdcdc] rounded-lg shadow-sm overflow-x-auto overflow-y-hidden whitespace-nowrap"
          aria-label="Dashboards navigation"
        >
          {tabs.map((tab, index) => (
            <a
              key={tab.id}
              href={tab.href}
              className={`inline-flex items-center h-11 px-3.5 font-medium no-underline text-inherit border-0 border-b-2 ${
                tab.active ? 'border-[#6c8ff5]' : 'border-transparent'
              } ${index > 0 ? 'ml-1.5' : ''} transition-colors duration-150 ease-in-out hover:border-[#aaa]`}
            >
              {tab.label}
            </a>
          ))}
        </div>

        {/* Empty State */}
        <div id="empty" className="opacity-70 italic hidden">
          태그가 &apos;tab-show&apos;인 대시보드가 없습니다.
        </div>
      </div>
    </div>
  );
}
