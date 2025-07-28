const PageActions: React.FC<{ className?: string; actions: React.ReactNode[] }> = ({ className = '', actions }) => {

    return (
        <>
            <div className={`w-full sm:flex gap-2  ${className ? className : ""}`}>
                {actions.map((action, index) => (
                    <div className="pt-4" key={index}>{action}</div>
                ))}
            </div>
        </>
    );
};

export default PageActions
