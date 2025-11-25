import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CampaignInsights from "@/components/CampaignInsights";
import DetailsField from "@/components/DetailsField";

export default async function Campaign({params}: {params: Record<string, string>}) {
    const { campId } = await params;
    let campaign;
    let campaignInsight;
    try {
        const result = await Promise.allSettled([
            fetch(`https://mixo-fe-backend-task.vercel.app/campaigns/${campId}`).then(res => res.json()), 
            fetch(`https://mixo-fe-backend-task.vercel.app/campaigns/${campId}/insights`).then(res => res.json())
        ])

        const finalData = result.map((result) => {
        if (result.status === 'fulfilled') {
            return result.value
        }
            return null
        }).filter(item => item != null)

        campaign = finalData[0].campaign;
        campaignInsight = finalData[1].insights;
    } catch (error) {
        throw error
    }

    console.log("campaign, campaignInsight", campaign, campaignInsight)

    return (
        <div>
            <Link href={'/'} className="flex items-center gap-2 mb-5">
                <ArrowLeft />
                <span>Back</span>
            </Link>

            <h1 
            className="text-xl lg:text-2xl p-3 font-[900] text-center underline">
                Campaign Details
            </h1>

            {/* Campaign Insights */}
            <section 
            className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto p-3 shadow-xl rounded-lg border border-[#ddd]"
            >
                <DetailsField label="Name" value={campaign.name}/>
                <DetailsField label="Status" value={campaign.status}/>
                <DetailsField label="Budget" value={campaign.budget} />
                <DetailsField label="Daily Budget" value={campaign.daily_budget}/>

                <section className={`flex items-center justify-between [&>p]:text-xl`}>
                    <p>Platform</p>
                    <section className="[&>span]:text-xl">
                        {
                            campaign.platforms.map((item: string, index: number) => {
                                return (
                                    <span key={item+index} className="pl-2">
                                        {item}
                                    </span>
                                )
                            })
                        }
                    </section>
                </section>
                <DetailsField label="Created At" value={new Date(campaign.created_at).toLocaleString()} />
            </section>

            {/* Campaign Details */}
            <CampaignInsights campaignInsight={campaignInsight}/>
        </div>
    )
}