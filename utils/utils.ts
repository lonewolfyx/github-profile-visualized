/**
 * 数值千分位分隔函数
 * 例：36405  →  "36,405"
 *
 * @param {number|string} value  原始数值或字符串
 * @returns {string}
 */
export const formatWithThousands = (value: number | string): string => {
    return Number(value).toLocaleString('en-US')
}

/**
 * 数值单位转化函数
 * 例：36405  →  "36.4k"
 *
 * @param {number} value        原始数值
 * @param {number} precision    保留的小数位（默认 1 位）
 * @returns {string}
 */

export const formatWithUnit = (value: number, precision = 1) => {
    const units = ['', 'k', 'M', 'B', 'T'] // 千、百万、十亿、万亿…
    const absVal = Math.abs(value)
    if (absVal < 1000) return String(value) // < 1000 直接返回原始数

    let unitIndex = Math.floor(Math.log10(absVal) / 3) // 每 1000 进 1 级
    unitIndex = Math.min(unitIndex, units.length - 1) // 防止越界

    const divisor = 10 ** (unitIndex * 3)
    const short = (value / divisor).toFixed(precision)

    // 去掉末尾多余的 “.0”
    return `${parseFloat(short)}${units[unitIndex]}`
}
