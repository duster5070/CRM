// email-tailwind.config.ts
import type { TailwindConfig } from "@react-email/tailwind";

const emailTailwindConfig: TailwindConfig = {
  theme: {
    extend: {
      fontFamily: {
        raycast: ["Inter", "sans-serif"],
      },
    },
  },
};

export default emailTailwindConfig;
