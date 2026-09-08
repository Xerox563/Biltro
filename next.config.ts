import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
  // stops next regenerating AGENTS.md and CLAUDE.md on every run
  agentRules: false,
};

export default nextConfig;
