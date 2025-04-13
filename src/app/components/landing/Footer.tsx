export function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <img src="https://www.cryptovantage.com/app/uploads/2021/05/Solana-logo-1.png" alt="Solana" className="h-6 w-6" />
            <span className="font-semibold text-white">Solana Dashboard</span>
          </div>
          <div className="flex space-x-8">
            <a
              href="https://solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Solana
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              GitHub
            </a>
            <a
              href="https://docs.solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Documentation
            </a>
          </div>
        </div>
        <div className="text-center mt-12 text-sm text-gray-500">
          © {new Date().getFullYear()} Solana Dashboard. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
