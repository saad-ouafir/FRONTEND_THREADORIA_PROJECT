import {
  FiArrowRight,
  FiUsers,
  FiHeart,
  FiTrendingUp,
  FiBookmark,
  FiStar,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: FiUsers,
      title: t("home.features_connect_title"),
      description: t("home.features_connect_description"),
    },
    {
      icon: FiHeart,
      title: t("home.features_engage_title"),
      description: t("home.features_engage_description"),
    },
    {
      icon: FiTrendingUp,
      title: t("home.features_discover_title"),
      description: t("home.features_discover_description"),
    },
    {
      icon: FiBookmark,
      title: t("home.features_save_title"),
      description: t("home.features_save_description"),
    },
  ];

  const stats = [
    { number: "1M+", label: t("home.stats_users") },
    { number: "10M+", label: t("home.stats_posts") },
    { number: "50M+", label: t("home.stats_interactions") },
    { number: "100+", label: t("home.stats_countries") },
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Content Creator",
      content:
        "Threadoria is my favorite social platform! The community is amazing and the interface is so clean.",
      rating: 5,
    },
    {
      name: "Jordan Lee",
      role: "Digital Artist",
      content:
        "I love sharing my art on Threadoria. The engagement and support from the community is incredible!",
      rating: 5,
    },
    {
      name: "Sam Rivera",
      role: "Tech Enthusiast",
      content:
        "Finally, a social media platform that focuses on meaningful connections. No chat distractions!",
      rating: 5,
    },
  ];

  const categories = [
    "Photography",
    "Art & Design",
    "Tech & Innovation",
    "Lifestyle",
    "Gaming",
    "Music",
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="w-full mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
              {t("home.hero_title")}{" "}
              <span className="text-accent">{t("home.hero_highlight")}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed">
              {t("home.hero_description")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-colors">
                {t("home.hero_getStarted")}
                <FiArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-text-primary font-medium rounded-xl hover:bg-bg-tertiary transition-colors">
                {t("home.hero_explore")}
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-bg-tertiary border-2 border-bg-secondary flex items-center justify-center text-text-muted text-xs font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FiStar key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-text-muted">
                  {t("home.hero_joinUsers")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent">
                  {stat.number}
                </div>
                <div className="mt-1 text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              {t("home.features_title")}
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              {t("home.features_subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-bg-secondary rounded-2xl border border-border hover:border-border-hover transition-colors">
                <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-bg-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              {t("home.categories_title")}
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              {t("home.categories_subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="group flex items-center justify-between p-5 bg-bg-primary rounded-xl border border-border hover:border-accent transition-colors">
                <span className="font-medium text-text-primary group-hover:text-accent transition-colors">
                  {category}
                </span>
                <FiArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              {t("home.testimonials_title")}
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              {t("home.testimonials_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-bg-secondary rounded-2xl border border-border">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted text-sm font-medium">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-text-muted">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t("home.cta_title")}
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {t("home.cta_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent font-medium rounded-xl hover:bg-white/90 transition-colors">
              {t("home.cta_join")}
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
              {t("home.cta_exploreCommunities")}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-bg-secondary border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center">
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} Threadoria. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
