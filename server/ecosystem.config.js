module.exports = {
  apps: [
    {
      name: "Nova Nest",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
