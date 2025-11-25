

export interface CampaignType {
    id: string,
    name: string
    brand_id: string,
    status: string
    budget: number,
    daily_budget: number,
    platform: string[],
    created_at: Date
}

export interface CampaignInsightType {
    campaign_id: string,
    timestamp: Date,
    impressions: number,
    clicks: number,
    conversions: number,
    spend: number,
    ctr: number,
    cpc: number,
    conversion_rate: number
}