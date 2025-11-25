

export default function DetailsField({label, value}: {label: string, value: string | number}) {
    
    return (
        <section className={`flex items-center justify-between [&>p]:text-xl mb-2`}>
            <p>{label}</p>
            <p>{value}</p>
        </section>
    )
}