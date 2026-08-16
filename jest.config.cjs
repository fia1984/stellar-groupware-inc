/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/Contact.test.tsx",
    "**/__tests__/Footer.test.tsx",
    "**/__tests__/Header.test.tsx",
    "**/__tests__/Hero.test.tsx",
    "**/__tests__/Process.test.tsx",
    "**/__tests__/Services.test.tsx",
    "**/__tests__/VideoSection.test.tsx",
    "**/__tests__/WhyChooseUs.test.tsx",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          module: "CommonJS",
          moduleResolution: "Node",
          esModuleInterop: true,
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__tests__/styleMock.cjs",
  },
  clearMocks: true,
};
