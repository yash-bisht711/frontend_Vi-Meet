import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-between bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 animate-gradient-x text-white overflow-hidden">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow text-white px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">
            Welcome to <span className="text-yellow-300">Vi-Meet</span>
          </h1>
          <p className="text-lg mb-8 text-gray-100 leading-relaxed">
            Connect instantly with friends, family, or colleagues through
            high-quality video calls, voice chats, and real-time messaging.
            Experience smooth, secure, and fun conversations — all in one place.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center max-w-6xl mb-10"
        >
          {[
            {
              title: "📹 Video Calls",
              desc: "Enjoy high-quality video calls with friends and colleagues.",
            },
            {
              title: "🎙️ Voice Chats",
              desc: "Switch seamlessly between video and voice modes anytime.",
            },
            {
              title: "💬 Messaging",
              desc: "Stay connected with real-time text messaging & chatrooms.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-100">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          aria-label="Get started with Vi-Meet"
          className="bg-yellow-400 text-indigo-900 font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-yellow-300 hover:shadow-2xl transition animate-bounce"
        >
          🚀 Get Started
        </motion.button>
      </main>

      {/* Footer */}
      <footer className="text-sm text-white/80 text-center py-4 border-t border-white/20 bg-white/5 backdrop-blur-sm">
        <div className="flex justify-center gap-4 mb-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
          <a
            href="mailto:support@vimeet.com"
            className="hover:text-white transition"
          >
            Contact
          </a>
        </div>
        <p>© {new Date().getFullYear()} Vi-Meet. All rights reserved.</p>
      </footer>
    </div>
  );
}
