import Link from "next/link"
import { MenuItemUiState } from "./menu-item-ui-state"
import Typography from "@/components/Typography"

const PageHeaderMenuItem: React.FC<MenuItemUiState> = ({ id, label, link, isSelected }) => {
    return (
        <>
            {
                <li key={id}>
                    <Link href={link}>
                        <Typography
                            type="Custom"
                            className={`${isSelected ? "text-primary" : ""
                                } hover:text-primary cursor-pointer mx-3`}
                        >
                            {label}
                        </Typography>
                    </Link>
                </li>
            }
        </>
    )
}

export default PageHeaderMenuItem