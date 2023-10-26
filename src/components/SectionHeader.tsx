type SectionHeaderProps = {
    title: string
}

export default function SectionHeader({title}: SectionHeaderProps) {
    return (
        <div className="section-header">
            <h6 className="text-primary-100">{title}</h6>
            <hr />
        </div>
    )
}
