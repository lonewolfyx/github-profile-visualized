import { domToBlob } from 'modern-screenshot'
import { toast } from 'vue-sonner'

export function copyPngToClipboard() {
    navigator.clipboard.write([
        new ClipboardItem({
            'image/png': new Promise(async (resolve) => {
                const frame = document.querySelector<HTMLDivElement>(
                    '[data-github-profile-visualize]',
                )
                if (!frame) return

                await nextTick()

                domToBlob(frame, {
                    scale: 4,
                    width: frame.offsetWidth,
                    height: frame.offsetHeight,
                })
                    .then((blob) => {
                        toast.success('Successfully built shared image.')
                        resolve(blob)
                    })
            }),
        }),
    ])
}
