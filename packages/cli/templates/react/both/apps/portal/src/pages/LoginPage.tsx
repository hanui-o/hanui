import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Card } from '@hanui/react';
import './LoginPage.css';

interface LoginForm {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Login submitted:', formData);
      alert(
        '로그인 기능은 데모 버전입니다.\n실제 인증 시스템과 연동이 필요합니다.'
      );
      setIsSubmitting(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <h1 className="login-title">로그인</h1>
            <p className="login-description">
              민원포털 서비스 이용을 위해 로그인하세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
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
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
              />
              {errors.password && (
                <span
                  id="password-error"
                  className="error-message"
                  role="alert"
                >
                  {errors.password}
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="login-footer">
            <div className="login-links">
              <a href="#find-password" className="login-link">
                비밀번호 찾기
              </a>
              <span className="link-divider">|</span>
              <a href="#signup" className="login-link">
                회원가입
              </a>
            </div>

            <div className="back-to-home">
              <Link to="/" className="back-link">
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </Card>

        <div className="login-info">
          <Card className="info-card">
            <h3 className="info-title">로그인 안내</h3>
            <ul className="info-list">
              <li>회원가입 후 모든 서비스를 이용할 수 있습니다.</li>
              <li>소셜 로그인도 지원 예정입니다.</li>
              <li>개인정보는 안전하게 암호화되어 저장됩니다.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
