import { Container } from '@hanui/react';

export function Footer() {
  return (
    <footer id="footer" className="py-6 md:py-0">
      <Container className="flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-krds-gray-70 md:text-left">
          MIT License ·Built by{' '}
          <a
            href="https://www.linkedin.com/in/hanui/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-krds-gray-95"
          >
            HANUI
          </a>{' '}
          at{' '}
          <a
            href="https://oddodd.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-krds-gray-95"
          >
            odd:odd
          </a>
          . The source code is available on{' '}
          <a
            href="https://github.com/hanui-o/hanui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-krds-gray-95"
          >
            GitHub
          </a>
          .
        </p>
      </Container>
    </footer>
  );
}
