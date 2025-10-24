export default function FinancialsLayout(
    { children, transactionDetails }: Readonly<{
        children: React.ReactNode
        transactionDetails: React.ReactNode
    }>
) {
    return (
        <>
            {children}
            {transactionDetails}
        </>
    )
}