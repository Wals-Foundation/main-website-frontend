"use client"

import Button from "@/components/Button";
import { WalsLogo } from "@/components/Logo";
import MainMenu from "@/menu/ui/MainMenu";
import { MenuItemUiState } from "@/menu/ui/menu-item-ui-state";
import { useAppDispatch, useAppSelector } from "@/logic/store/hooks";
import { toggleMobileMenuVisibility } from "@/menu/ui/logic";
import { useEffect } from "react";

const MobileHeaderDetail: React.FC<{
  className?: string,
  menuItems: MenuItemUiState[],
  showDonateBtn: boolean
}> = ({ className, menuItems, showDonateBtn }) => {
  return (
    <div className={className ?? ""}>
      <div className="h-full flex flex-col gap-4">
        <MainMenu className="flex-1" menuItems={menuItems} />
      {showDonateBtn && (
        <div className="mt-4">
          <Button theme="primary" title="Donate Now" />
        </div>
      )}
      </div>
    </div>
  )
}

const PageHeaderMobile: React.FC<{
  className?: string;
  menuItems: MenuItemUiState[];
  showDonateBtn: boolean;
}> = ({ className, menuItems, showDonateBtn }) => {
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector(
    (state) => state.useMainMenuItems.mobileMenuOpened
  );

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  return (
    <>
    <div className={`flex justify-between items-center gap-4 py-2 relative z-50 ${className ?? ""}`}>
        <div className="shrink-0">
          <WalsLogo />
        </div>
        <button
          id="menu-button"
          className="md:hidden p-2"
          onClick={() => dispatch(toggleMobileMenuVisibility())}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <img
            src={mobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
            alt={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="h-interactive filter invert"
          />
        </button>
      </div>
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 bg-white transition-transform duration-300 ease-in-out z-40 ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="w-11/12 mx-auto pt-16">
            <MobileHeaderDetail
              className=""
              menuItems={menuItems}
              showDonateBtn={showDonateBtn}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PageHeaderMobile;
