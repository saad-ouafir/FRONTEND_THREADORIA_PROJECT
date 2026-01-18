import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      title: t("home.features_connect_title"),
      description: t("home.features_connect_description"),
      icon: "🌐",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: t("home.features_engage_title"),
      description: t("home.features_engage_description"),
      icon: "💬",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: t("home.features_discover_title"),
      description: t("home.features_discover_description"),
      icon: "🔍",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        ></div>
        <div
          className="absolute -bottom-40 right-1/4 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center mb-20">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t("home.hero_title")}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {t("home.hero_highlight")}
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("home.hero_description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link
                to="/home"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500 dark:to-purple-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10">{t("home.hero_getStarted")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-600 dark:to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <Link
                to="/auth/login"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
              >
                {t("navbar.login")}
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gray-50 dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-2xl hover:shadow-gray-300/50 dark:hover:shadow-gray-900/50 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Gradient Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                <p className="relative text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>

                {/* Hover Arrow */}
                <div className="relative mt-4 text-transparent group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    Learn more
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Threads Posted", value: "50K+" },
              { label: "Communities", value: "500+" },
              { label: "Countries", value: "100+" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-border text-center backdrop-blur-sm ">
        <p>© {new Date().getFullYear()} Threadoria. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
