import { ThemeToggle } from './ThemeToggle'

export const SiteFooter = () => {
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-0">
        <p className="text-center text-sm leading-loose md:text-left">
          Built by{' '}
          <a
            aria-label="Personal website Erik"
            href="https://erikvandam.dev"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Erik
          </a>
          .
        </p>
        <ThemeToggle />
      </div>
    </footer>
  )
}
