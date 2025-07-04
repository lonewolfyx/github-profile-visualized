import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/fonts', 'shadcn-nuxt'],

    ssr: false,
    devtools: { enabled: true },

    app: {
        head: {
            title: 'GitHub Profile Visualizer',
            charset: 'utf-8',
            meta: [
                {
                    name: 'description',
                    content: '🫣 Elegant GitHub Profile Visualization, Gain insights into your contributions, expertise, and community engagement with intuitive visualizations',
                },
                {
                    name: 'keywords',
                    content: [
                        'GitHub Profile Visualizer',
                        'GitHub Profile Analyzer',
                        'GitHub Profile Insights',
                        'GitHub Profile Stats',
                        'GitHub Profile Summary',
                        'GitHub Profile Overview',
                        'GitHub Profile Analysis',
                    ].join(','),
                },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: `/favicon.svg` },
            ],
        },
    },

    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/main.css',
    ],

    runtimeConfig: {
        app: {
            github: {
                token: process.env.NUXT_GITHUB_TOKEN,
            },
        },
    },

    devServer: {
        port: 3333,
    },
    compatibilityDate: '2025-05-15',

    vite: {
        server: {
            open: true,
        },
        plugins: [
            tailwindcss(),
        ],
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4, // 4, or 'tab'
                quotes: 'single', // or 'double'
            },
        },
    },

    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui',
    },
})
