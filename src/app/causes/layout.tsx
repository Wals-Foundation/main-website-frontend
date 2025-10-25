export default function CausesLayout(
    { children, donate }: Readonly<{
        children: React.ReactNode
        donate: React.ReactNode
    }>
) {
    return (
        <>
            {children}
            {donate}
        </>
    )
}