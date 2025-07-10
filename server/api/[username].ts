export default defineEventHandler((event) => {
    const config = useRuntimeConfig(event)
    return {
        hello: config,
    }
})
