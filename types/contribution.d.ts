export interface IContributionDays {
    date?: string
    contributionCount?: number
}

export interface IContributionCalendarWeeks {
    contributionDays?: IContributionDays[]
}

export interface IContributionCalendar {
    contributionCalendar?: {
        weeks?: IContributionCalendarWeeks[]
        totalContributions?: number
    }
}

export interface ITransformedContributionData {
    date?: string | Date
    count?: number
}

export interface ITransformedContribution {
    year: number
    total: number
    contributions: ITransformedContributionData[]
}
