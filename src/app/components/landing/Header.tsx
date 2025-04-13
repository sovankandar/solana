export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="https://www.cryptovantage.com/app/uploads/2021/05/Solana-logo-1.png" alt="Solana" className="h-7 w-7" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-transparent">
            Solana Dashboard
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
            About
          </a>
          <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
            Features
          </a>
          <a
            href="/dashboard"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md transition-all duration-300 text-sm font-medium"
          >
            Launch App
          </a>
        </nav>
        <button className="md:hidden text-gray-300 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
