export function About() {
  return (
    <section id="about" className="py-24 bg-zinc-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-white">About The Project</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-zinc-900 rounded-xl border border-zinc-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Token Creation</h3>
            <p className="text-gray-400 leading-relaxed">
              Create and deploy your own Solana tokens with just a few clicks. Full support for custom token parameters.
            </p>
          </div>
          <div className="p-8 bg-zinc-900 rounded-xl border border-zinc-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Token Management</h3>
            <p className="text-gray-400 leading-relaxed">
              Mint new tokens, transfer to other wallets, and manage your token holdings through an intuitive interface.
            </p>
          </div>
          <div className="p-8 bg-zinc-900 rounded-xl border border-zinc-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Transaction History</h3>
            <p className="text-gray-400 leading-relaxed">
              Track all your token transactions with detailed history and real-time status updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
