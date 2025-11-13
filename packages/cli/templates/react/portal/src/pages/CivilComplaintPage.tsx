import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '@hanui/react';
import Breadcrumb from '../components/Breadcrumb';
import { CivilComplaint } from '../types';
import './CivilComplaintPage.css';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  title?: string;
  content?: string;
}

export default function CivilComplaintPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CivilComplaint>({
    name: '',
    email: '',
    phone: '',
    category: '',
    title: '',
    content: '',
    files: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: '', label: '카테고리를 선택하세요' },
    { value: 'general', label: '일반 민원' },
    { value: 'facility', label: '시설물 관련' },
    { value: 'traffic', label: '교통 관련' },
    { value: 'environment', label: '환경 관련' },
    { value: 'welfare', label: '복지 관련' },
    { value: 'etc', label: '기타' },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({ ...prev, files: Array.from(files) }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.';
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = '유효한 연락처를 입력해주세요.';
    }

    if (!formData.category) {
      newErrors.category = '카테고리를 선택해주세요.';
    }

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }

    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = '내용을 10자 이상 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('입력 내용을 확인해주세요.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert(
        '민원이 성공적으로 접수되었습니다.\n처리 결과는 이메일로 안내드리겠습니다.'
      );
      setIsSubmitting(false);
      navigate('/');
    }, 1000);
  };

  const breadcrumbItems = [{ label: '홈', path: '/' }, { label: '민원신청' }];

  return (
    <div className="civil-complaint-page">
      <Breadcrumb items={breadcrumbItems} />

      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">민원 신청</h1>
          <p className="page-description">
            민원 사항을 입력해주세요. 평균 5일 이내에 처리됩니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <Card className="form-card">
            <div className="form-section">
              <h2 className="section-title">신청자 정보</h2>

              <div className="form-group">
                <label htmlFor="name" className="form-label required">
                  이름
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span id="name-error" className="error-message" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label required">
                  이메일
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="error-message" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label required">
                  연락처
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <span id="phone-error" className="error-message" role="alert">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">민원 내용</h2>

              <div className="form-group">
                <label htmlFor="category" className="form-label required">
                  카테고리
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`form-select ${errors.category ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.category}
                  aria-describedby={
                    errors.category ? 'category-error' : undefined
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span
                    id="category-error"
                    className="error-message"
                    role="alert"
                  >
                    {errors.category}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="title" className="form-label required">
                  제목
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="민원 제목을 입력하세요"
                  aria-required="true"
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {errors.title && (
                  <span id="title-error" className="error-message" role="alert">
                    {errors.title}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="content" className="form-label required">
                  내용
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="민원 내용을 상세히 입력해주세요 (최소 10자)"
                  rows={8}
                  className={`form-textarea ${errors.content ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.content}
                  aria-describedby={
                    errors.content ? 'content-error' : undefined
                  }
                />
                {errors.content && (
                  <span
                    id="content-error"
                    className="error-message"
                    role="alert"
                  >
                    {errors.content}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="files" className="form-label">
                  첨부파일
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.hwp,.docx"
                  className="form-file-input"
                  aria-describedby="file-help"
                />
                <p id="file-help" className="form-help-text">
                  PDF, JPG, PNG, HWP, DOCX 파일을 업로드할 수 있습니다. (최대
                  50MB)
                </p>
                {formData.files && formData.files.length > 0 && (
                  <ul className="file-list">
                    {formData.files.map((file, index) => (
                      <li key={index} className="file-item">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Card>

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => navigate(-1)}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? '처리중...' : '신청하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
