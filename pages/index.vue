<template>
    <div class="relative w-full h-full  text-gitColor-default">
        <div class="relative w-screen h-screen p-[20vh_10vw_10vh]">
            <div class="flex justify-start items-center gap-3">
                <Icons
                    height="32"
                    icon="uil:github"
                    width="32"
                />
                <h1 class="font-mono">
                    Github Profile Visualize
                </h1>
                <!--                <GradientButton bg-color="#27272a"> -->
                <!--                    <div class="flex items-center gap-1"> -->
                <!--                        <Icons -->
                <!--                            height="16" -->
                <!--                            icon="lucide:sparkle" -->
                <!--                            width="16" -->
                <!--                        /> -->
                <!--                        <span>Star on Github</span> -->
                <!--                        <NumberTicker -->
                <!--                            :decimal-places="0" -->
                <!--                            :value="100" -->
                <!--                            class="text-white mx-2" -->
                <!--                        /> -->
                <!--                    </div> -->
                <!--                    🚀 -->
                <!--                </GradientButton> -->
            </div>
            <h2 class="w-[39rem] text-6xl font-medium font-sans leading-16 mt-24 mb-14">
                A simpler way to show your GitHub profile and repositories
            </h2>
            <div class="flex w-full max-w-sm items-center gap-1.5 mb-20">
                <Input
                    v-model="username"
                    class="focus-visible:shadow-none  bg-default-github border-default-github"
                    placeholder="Enter a Github Username..."
                    type="text"
                />
                <Button
                    class="cursor-pointer"
                    variant="github"
                    @click="handleVisualize"
                >
                    Visualize
                </Button>
            </div>
            <div>
                <span class="text-sm font-mono text-zinc-600">build with <a
                    href="https://nuxt.com/"
                    target="_blank"
                    title="NuxtJs"
                >NuxtJs v3.17.5</a> & <a
                    href="https://tailwindcss.com/"
                    title="Tailwindcss"
                    target="_blank"
                >Tailwindcss</a> By <a
                    href="https://github.com/lonewolfyx"
                    target="_blank"
                    title="OldDriver"
                >lonewolfyx</a>. Source is on
                    <a
                        href="https://github.com/lonewolfyx/github-profile-visualized"
                        target="_blank"
                        title="Github"
                    >Github</a>
                </span>
            </div>
        </div>

        <div class="absolute w-[45vw] top-[50%] transform-[translateY(-50%)] right-10 rounded-full">
            <div
                class="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg lg:w-full md:w-full"
            >
                <img
                    alt="Github Profile Visualized"
                    class="z-10 size-28"
                    src="/assets/images/logo.svg"
                >
                <Ripple
                    circle-class="border-[hsl(var(--primary))] bg-[#0000]/25 dark:bg-[#fff]/25 rounded-full"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Ripple } from '~/components/ui/ripple'

const username = ref<string>('')

const handleVisualize = () => navigateTo(`/${username.value}`)
</script>
