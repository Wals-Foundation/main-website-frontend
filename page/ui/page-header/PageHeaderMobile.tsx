import { MenuItemUiState } from "@/menu/ui/menu-item-ui-state";

const PageHeaderMobile: React.FC<{
  className?: string,
  menuItems: MenuItemUiState[],
  showDonateBtn: boolean
}> = ({ className }) => {
  return (
    <div className={className ?? ""}>
      <div className="w-11/12 py-4 text-center bg-white border-b border-border-gray">
        <span className="font-semibold">Mobile Header</span>
      </div>
    </div>
  );
};

export default PageHeaderMobile;
