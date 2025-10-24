const OrganisationImpactContainer: React.FC<{
    className?: string,
    children: React.ReactNode
}> = ({ className, children }) => {
    return (
        <div className={`w-full aspect-[3/2] ${className ?? ""}`}>
            <div className="flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default OrganisationImpactContainer