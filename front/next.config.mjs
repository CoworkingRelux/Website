import { hostname } from "os";

// next.config.mjs
export default {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  webpack(config, options) {
    config.resolve.modules.push("./src");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  icons: {
    icon: "/images/favicon.ico",
  },
};
