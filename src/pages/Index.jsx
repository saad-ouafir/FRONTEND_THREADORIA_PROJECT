import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiArrowRight, FiUsers, FiMessageSquare, FiTrendingUp, FiGlobe } from "react-icons/fi";

const Index = () => {
  const { t } = useTranslation();
  useTheme();
  const [mounted] = useState(true);

  const features = [
    {
      title: t("home.features_connect_title"),
      description: t("home.features_connect_description"),
      icon: FiGlobe,
      color: "accent",
    },
    {
      title: t("home.features_engage_title"),
      description: t("home.features_engage_description"),
      icon: FiMessageSquare,
      color: "purple",
    },
    {
      title: t("home.features_discover_title"),
      description: t("home.features_discover_description"),
      icon: FiTrendingUp,
      color: "orange",
    },
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: FiUsers },
    { label: "Threads Posted", value: "50K+", icon: FiMessageSquare },
    { label: "Communities", value: "500+", icon: FiGlobe },
    { label: "Countries", value: "100+", icon: FiTrendingUp },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        ></div>
        <div
          className="absolute -bottom-40 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* Hero Section */}
          <div className="text-center mb-16 sm:mb-24">
            {/* Main Heading */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <p className="text-xs sm:text-sm font-semibold text-accent">
                {t("home.hero_subtitle") || "Welcome to Threadoria"}
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-text-primary">
              {t("home.hero_title")} <span className="text-blue-500">{t("home.hero_highlight")}</span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("home.hero_description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 sm:mb-20">
              <Link
                to="/home"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
              >
                {t("home.hero_getStarted")}
                <FiArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/auth/login"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-border rounded-xl font-semibold text-text-primary hover:bg-bg-tertiary transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {t("navbar.login")}
              </Link>
            </div>

            {/* Hero Image / Illustration Area */}
            <div className="relative h-48 sm:h-64 lg:h-72 mb-12 sm:mb-16 rounded-2xl bg-linear-to-br from-bg-secondary to-bg-tertiary border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/10 mb-4 mx-auto">
                    <FiMessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
                  </div>
                  <p className="text-text-secondary text-sm sm:text-base">
                    {t("home.hero_cta") || "Start sharing your thoughts today"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20 sm:mb-28">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                {t("home.features_title") || "Powerful Features"}
              </h2>
              <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
                {t("home.features_description") || "Everything you need to connect and engage"}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative p-6 sm:p-8 bg-bg-secondary border border-border rounded-xl sm:rounded-2xl hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Icon Background */}
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-accent/10 mb-4 sm:mb-6 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-text-primary">{feature.title}</h3>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    {/* Arrow Link */}
                    <div className="flex items-center gap-2 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <span>{t("home.learn_more") || "Learn more"}</span>
                      <FiArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-accent/5 via-transparent to-accent/5 rounded-2xl blur-xl"></div>
            <div className="relative bg-bg-secondary border border-border rounded-2xl p-8 sm:p-12 lg:p-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary text-center mb-12 sm:mb-16">
                {t("home.stats_title") || "Join Thousands of Users"}
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="group text-center">
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                        </div>
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-accent mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-text-secondary font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 sm:mt-28 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6">
              {t("home.cta_title") || "Ready to Get Started?"}
            </h2>
            <p className="text-text-secondary text-sm sm:text-base mb-8 max-w-xl mx-auto">
              {t("home.cta_description") || "Join our community and start sharing meaningful conversations."}
            </p>

            <Link
              to="/home"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              {t("home.hero_getStarted")}
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 sm:py-8 border-t border-border text-center">
        <p className="text-text-secondary text-xs sm:text-sm">
          © {new Date().getFullYear()} Threadoria. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
