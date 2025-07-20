const PageActions: React.FC<{ className?: string; actions: React.ReactNode[] }> = ({ className = '', actions }) => {
    return (
        <div className={`flex gap-2  ${className ? className : ""}`}>
            {actions.map((action, index) => (
                <div key={index}>{action}</div>
            ))}
        </div>
    );
};

export default PageActions
