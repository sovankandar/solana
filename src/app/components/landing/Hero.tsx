export function Hero() {
  return (
    <section className="pt-36 pb-24 px-4 bg-zinc-900">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-transparent leading-tight">
          Manage Your Solana Tokens
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          A powerful dashboard for creating, minting, and managing Solana tokens with ease. Built with security and
          simplicity in mind.
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-all duration-300 shadow-lg hover:shadow-purple-900/30"
        >
          Live Demo
        </a>
      </div>
    </section>
  )
}
