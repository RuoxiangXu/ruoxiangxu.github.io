export default function TemplateRepoButton() {
  return (
    <a
      href="https://github.com/RuoxiangXu/terminal-personal-website"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-amber-300/70 dark:border-amber-400/40 bg-white/85 dark:bg-neutral-900/70 px-3 py-1.5 shadow-lg shadow-amber-200/40 dark:shadow-amber-900/20 transition-all hover:-translate-y-0.5 hover:border-amber-400 dark:hover:border-amber-300"
      aria-label="Open the terminal template repository"
    >
      <svg
        className="h-[18px] w-[18px] text-amber-500 transition-colors group-hover:text-amber-400"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.5 9.7 8.4H3.3l5 3.9-1.9 6.2L12 15l5.6 3.5-1.9-6.2 5-3.9h-6.4z" />
      </svg>
      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Template Repo</span>
    </a>
  )
}
