const { withBlitz } = require('@blitzjs/next')

module.exports = withBlitz({
    images: {
        deviceSizes: [320, 480, 610, 740, 980, 1300, 1600, 2000],
        domains: []
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config, options) => {
        config.module.rules.push({
            include: [options.dir],
            issuer: /\.jsx?$/,
            test: /\.svg$/,
            use: [
                options.defaultLoaders.babel,
                {
                    loader: '@svgr/webpack',
                    options: {
                        babel: false,
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            removeViewBox: false
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        })

        return config
    }
})
