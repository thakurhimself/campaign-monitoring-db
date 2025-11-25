import DetailsField from "@/components/DetailsField";
import { CampaignType } from "@/types/types";
import Link from "next/link";

export default async function Home() {
  let campaignList;
  let aggregateMetrics;
  try {
    const result = await Promise.allSettled([
      fetch('https://mixo-fe-backend-task.vercel.app/campaigns').then(res => res.json()), 
      fetch('https://mixo-fe-backend-task.vercel.app/campaigns/insights').then(res => res.json())
    ])

    const finalData = result.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value
      }
      return null
    }).filter(item => item != null)

    campaignList = finalData[0];
    aggregateMetrics = finalData[1].insights;
  } catch (error) {
    throw error;
  }

  return (
    <div 
    className="w-full lg:w-4/5 mx-auto"
    >
      <main 
      className="p-3"
      >
        <h1 className="text-2xl font-bold mb-3">Aggregated Campaigns Insights</h1>
        {
          !aggregateMetrics ?
          <p className="mb-5">Performance metrices could not be fetched</p>
          :
          <div className="w-full xl:w-1/3 p-3 mb-5 bg-slate-300">
            <DetailsField label="Total Campaigns" value={aggregateMetrics.total_campaigns} />
            <DetailsField label="Active Campaigns" value={aggregateMetrics.active_campaigns} />
            <DetailsField label="Paused Campaigns" value={aggregateMetrics.paused_campaigns} />
            <DetailsField label="Completed Campaigns" value={aggregateMetrics.completed_campaigns} />
            <DetailsField label="Total Impressions" value={aggregateMetrics.total_impressions} />
            <DetailsField label="Total Impressions" value={aggregateMetrics.total_impressions} />
            <DetailsField label="Total Conversions" value={aggregateMetrics.total_conversions} />
            <DetailsField label="Total Spend" value={aggregateMetrics.total_spend} />
            <DetailsField label="Average CTR" value={aggregateMetrics.avg_ctr} />
            <DetailsField label="Average CPC" value={aggregateMetrics.avg_cpc} />
            <DetailsField label="Average Conversion Rate" value={aggregateMetrics.avg_conversion_rate} />
          </div>
        }


        <hr className="mb-3"/>
        <h1 className="text-2xl font-bold mb-3">Campaigns</h1>

        <div>
          {
            (campaignList.campaigns && campaignList.campaigns.length > 0)
            ?
            <div className="grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {
                  campaignList.campaigns.map((item: CampaignType) => {
                    return (
                      <Link href={`/${item.id}`} key={item.id} 
                      className="bg-slate-600 p-3 h-32"
                      >
                        <p className="text-white">{item.name}</p>
                        <p className="text-white">{item.status}</p>
                      </Link>
                    )
                  })
                }
            </div>
            :
            <p>No active campaign</p>
          }
        </div>

      </main>
    </div>
  );
}
