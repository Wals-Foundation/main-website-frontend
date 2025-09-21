const OrganisationImpactContainer: React.FC<{
    className?: string,
    children: React.ReactNode
}> = ({ className, children }) => {
    return (
        <div className={className ?? ""}>
            <div className="w-full aspect-[3/2] flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default OrganisationImpactContainer