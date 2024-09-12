import path from "path"

const override = (config, env) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
    },
  }
  return config
}

export default override
