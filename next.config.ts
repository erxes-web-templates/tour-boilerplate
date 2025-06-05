import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ERXES_API_URL: "http://localhost:4000/graphql",
    ERXES_URL: "http://localhost:4000",
    ERXES_FILE_URL: "http://localhost:4000/read-file?key=",
    ERXES_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6IldlYiIsImNyZWF0ZWRBdCI6IjIwMjUtMDYtMDVUMDc6NTM6NDguODM3WiIsInVzZXJHcm91cElkIjoiIiwiZXhwaXJlRGF0ZSI6IjIwMjUtMDctMDVUMDg6MTU6MTQuNjgyWiIsIm5vRXhwaXJlIjp0cnVlLCJhbGxvd0FsbFBlcm1pc3Npb24iOnRydWUsIl9pZCI6IkVRcDhXVFdRVjl2Q0poT0xYY0xyUSIsIl9fdiI6MH0sImlhdCI6MTc0OTExMTMyMH0.aMAbMyfayx3tngsUHBJ-xBnpEh0yI7HO7g7H_aNw4Mo",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
      {
        protocol: "https",
        hostname: "tourism.app.erxes.io",
      },
    ],
  },
};

export default nextConfig;
