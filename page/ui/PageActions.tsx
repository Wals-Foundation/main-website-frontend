const PageActions: React.FC<{ className?: string; actions: React.ReactNode[] }> = ({ className = '', actions }) => {

    return (
        <>
            <div className={`w-full sm:flex sm:gap-6  ${className ? className : ""}`}>
                {actions.map((action, index) => (
                    <div
                        className={index !== 0 ? "mt-4 sm:mt-0" : ""}
                        key={index}
                    >
                        {action}
                    </div>
                ))}
            </div>
        </>
    );
};

export default PageActions
