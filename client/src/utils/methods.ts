export const firstUpperLetter = (word: string) =>
    word
        .split(/\s+/)
        .map((w) => w[0].toUpperCase() + w.substring(1))
        .join(" ")


