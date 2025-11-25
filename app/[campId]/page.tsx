import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CampaignInsights from "@/components/CampaignInsights";

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

    const detailsStylesClasses = 'flex items-center justify-between [&>p]:text-xl'

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
                <section 
                className={detailsStylesClasses}
                >
                    <p>Name</p>
                    <p>{campaign.name}</p>
                </section>

                <section
                className={detailsStylesClasses}
                >
                    <p>Status</p>
                    <p>{campaign.status}</p>
                </section>

                <section className={detailsStylesClasses}>
                    <p>Budget</p>
                    <p>{campaign.budget}</p>
                </section>

                <section className={detailsStylesClasses}>
                    <p>Daily Budget</p>
                    <p>{campaign.daily_budget}</p>
                </section>

                <section className={detailsStylesClasses}>
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

                <section className={detailsStylesClasses}>
                    <p>Created At</p>
                    <p>{new Date(campaign.created_at).toLocaleString()}</p>
                </section>
            </section>

            {/* Campaign Details */}
            <CampaignInsights campaignInsight={campaignInsight}/>
        </div>
    )
}