export interface ILanguageEdge {
    size?: number
    node?: {
        color?: string
        name?: string
    }
}

export interface ILanguages {
    edges?: ILanguageEdge[]
    totalCount?: number
}
