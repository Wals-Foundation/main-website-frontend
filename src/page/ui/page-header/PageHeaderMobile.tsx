"use client"

import { WalsLogo } from "@/components/Logo";
import MainMenu from "@/src/menu/ui/MainMenu";
import { useAppDispatch, useAppSelector } from "@/src/logic/store/hooks";
import { toggleMobileMenuVisibility } from "@/src/menu/ui/logic";
import { useEffect } from "react";
import WebsiteLink from "@/src/menu/ui/WebsiteLink";
import { FilledButton, IconButton } from "@/components/Button";
import CloseIcon from "@/assets/icons/close.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import Icon from "@/components/Icon";
import DarkModeToggle from "@/components/DarkModeToggle";
import { MenuItem } from "@/src/menu/menu-item";

const MobileHeaderDetail: React.FC<{
  className?: string,
  donateUrl: string,
  menuItems: MenuItem[],
  isDonatedEnabled: boolean
}> = ({ className, donateUrl, menuItems, isDonatedEnabled }) => {
  return (
    <div className={className ?? ""}>
      <div className="h-full flex flex-col gap-4">
        <MainMenu className="flex-1 min-h-0" menuItems={menuItems} />
        {isDonatedEnabled && (
          <WebsiteLink link={donateUrl}>
            <FilledButton
              className="w-full mt-4"
              title="donate now"
            />
          </WebsiteLink>
        )}
      </div>
    </div>
  )
}

const PageHeaderMobile: React.FC<{
  className?: string,
  donateUrl: string,
  menuItems: MenuItem[],
  isDonatedEnabled: boolean,
}> = ({ className, donateUrl, menuItems, isDonatedEnabled }) => {
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
          <WebsiteLink link="/">
            <WalsLogo />
          </WebsiteLink>
        </div>
        <div className="flex items-center">
          <DarkModeToggle />
          <IconButton
            icon={<Icon>{mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}</Icon>}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => dispatch(toggleMobileMenuVisibility())}
          />
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 bg-background transition-transform duration-300 ease-in-out z-40 ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="mx-horizontal h-full py-16">
            <MobileHeaderDetail
              className=""
              donateUrl={donateUrl}
              menuItems={menuItems}
              isDonatedEnabled={isDonatedEnabled}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PageHeaderMobile;
