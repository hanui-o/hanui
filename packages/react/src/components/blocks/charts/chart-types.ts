/**
 * 차트 공통 타입
 */

/** 차트 데이터 한 행 */
export interface ChartDatum {
  /** 항목 라벨 (X축 또는 범례에 표시) */
  label: string;
  /** 값 */
  value: number;
  /** 데이터별 강조 색상 (미지정 시 colors 배열에서 자동 할당) */
  color?: string;
}

/** 모든 차트가 공유하는 기본 Props */
export interface BaseChartProps {
  /** 차트 데이터 */
  data: ChartDatum[];
  /** 가로 크기 (미지정 시 부모 너비) */
  width?: number;
  /** 세로 크기 (기본 240) */
  height?: number;
  /** 차트 제목 (SVG title) */
  title?: string;
  /** 보조 설명 (SVG desc) */
  description?: string;
  /** 스크린 리더 라벨 (미지정 시 title 사용) */
  ariaLabel?: string;
  /** 값에 붙는 단위 (예: '명', '%') */
  unit?: string;
  /** 색상 배열 (KRDS 토큰 권장). 미지정 시 CHART_COLORS 사용 */
  colors?: string[];
  /** 여백 */
  margin?: { top: number; right: number; bottom: number; left: number };
  /** 대체 데이터 테이블 토글 버튼 노출 (기본 false) */
  showTableToggle?: boolean;
  /** 추가 className */
  className?: string;
}
