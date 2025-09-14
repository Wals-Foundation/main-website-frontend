import MarkdownDisplay from "./MarkdownDisplay"
import { SectionHeader } from "./Typography"

const OrganisationInfo: React.FC<{
  className?: string,
  info: string,
  label: string,
}> = ({ className, info, label }) => {
  return (
    <div className={className ?? ""}>
      <div className="w-full sm:grid sm:grid-cols-3 sm:gap-4">
          <div>
            <SectionHeader text={label} />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4 sm:col-span-2">
            <MarkdownDisplay markdown={info} />
          </div>
      </div>
    </div>
  )
}

export default OrganisationInfo