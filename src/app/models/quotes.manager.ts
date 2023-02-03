export interface QuotesManagerModel {
    companyId: number
    quotes: Quotes[]
}

export interface Quotes {
    rol?: string
    quote?: number
}
