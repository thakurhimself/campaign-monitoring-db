'use client';
import { useEffect, useState } from "react";
import { CampaignInsightType } from "@/types/types";
import DetailsField from "./DetailsField";

export default function CampaignInsights({campaignInsight}: {campaignInsight: CampaignInsightType}) {
    const [campInsight, setCampInsight] = useState<CampaignInsightType>(campaignInsight)
    useEffect(() => {
        const eventSource = new EventSource(`https://mixo-fe-backend-task.vercel.app/campaigns/${campaignInsight.campaign_id}/insights/stream`);
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setCampInsight(data);
        };

        eventSource.onerror = () => {
            eventSource.close();
        };

        return () => eventSource.close();
    }, [campaignInsight.campaign_id]);

    return (
        <section 
        className="mt-10 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto p-3 shadow-xl rounded-lg border border-[#ddd]"
        >
            <h3 className="text-xl font-bold text-center mb-3">Campaign Insights</h3>
            <DetailsField label="Impressions" value={campInsight.impressions} />
            <DetailsField label="Clicks" value={campInsight.clicks}/>
            <DetailsField label="Conversions" value={campInsight.conversions}/>
            <DetailsField label="Spend" value={campInsight.spend}/>
            <DetailsField label="CTR" value={campInsight.ctr}/>
            <DetailsField label="CPC" value={campInsight.cpc}/>
            <DetailsField label="Conversion Rate" value={campInsight.conversion_rate}/>
        </section>
    )
}