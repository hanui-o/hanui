import { Container } from '@hanui/react';

export function Footer() {
  return (
    <footer id="footer" className="py-6 md:py-0">
      <Container className="flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-left">
          Built by{' '}
          <a
            href="https://www.linkedin.com/in/hanui/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
          >
            HANUI
          </a>{' '}
          at{' '}
          <a
            href="https://oddodd.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
          >
            odd:odd
          </a>
          . The source code is available on{' '}
          <a
            href="https://github.com/odada-o/hanui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
          >
            GitHub
          </a>
          .
        </p>
      </Container>
    </footer>
  );
}
