import type { NextConfig } from "next"
import { Config } from "./core/config"

const nextConfig: NextConfig = {
  output: Config.isStaticHost ? "export" : undefined,
  images: {
    unoptimized: Config.isStaticHost
  }
}

export default nextConfig
