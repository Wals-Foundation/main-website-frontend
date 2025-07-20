import Link from "next/link"
import { MenuItemUiState } from "./menu-item-ui-state"
import Typography from "@/components/Typography"

const PageHeaderMenuItem: React.FC<MenuItemUiState> = ({label, link, isSelected }) => {
    return (
        <>
            {
                <Link href={link}>
                    <Typography
                        type="Custom"
                        className={`${isSelected ? "text-primary" : ""
                            } hover:text-primary cursor-pointer mx-3`}
                    >
                        {label}
                    </Typography>
                </Link>
            }
        </>
    )
}

export default PageHeaderMenuItem