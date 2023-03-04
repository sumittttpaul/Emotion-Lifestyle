import Router from 'next/router';
import dynamic from 'next/dynamic';
import React, { FC, MouseEvent, useState } from 'react';
import { Wishlist_Link } from '../../routerLinks/RouterLinks';
import { HeaderSearchButton } from '../button/header/Header.SearchButton';
import { HeaderWishlistButton } from '../button/header/Header.WishlistButton';
import { HeaderNav } from './assets/Header.Nav';
import { HeaderNavMenuProps } from './assets/Header.Nav.Menu';
import { HeaderUserButton } from '../button/header/Header.UserButton';
import { HeaderNotificationButton } from '../button/header/Header.NotificationButton';

const HeaderNavMenu = dynamic<HeaderNavMenuProps>(() =>
  import('./assets/Header.Nav.Menu').then((x) => x.HeaderNavMenu)
);

export interface HeaderProps {
  Page: string;
  setChildPage: (value: string) => void;
}

/**
 * @author
 * @function @Header
 **/
export const Header: FC<HeaderProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const NavMenuOpen = Boolean(anchorEl);

  const handleNavMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-[#0f0f0f] flex flex-col z-[999] sticky-top justify-center items-center w-full h-[70px] pr-2">
      <div className="flex w-full space-x-2.5 items-center justify-between">
        <div className="flex w-full space-x-2.5">
          {/* Nav Bar [ Discover, Offers, Collections] */}
          <div className="flex items-center">
            <HeaderNav
              open={NavMenuOpen}
              onOpen={handleNavMenuClick}
              Value={props.Page}
              onValueChange={props.setChildPage}
            />
          </div>
          {/* Search Button */}
          <div className="flex w-full">
            <HeaderSearchButton />
          </div>
        </div>
        {/* Wishlist, Notification, User Button */}
        <div className="flex space-x-2.5 items-center">
          <HeaderWishlistButton
            value={props.Page}
            Click={() => {
              setTimeout(() => {
                if (NavMenuOpen === true) handleNavMenuClose();
                props.setChildPage('Wishlist');
                Router.push(Wishlist_Link);
              }, 150);
            }}
          />
          <HeaderNotificationButton />
          <HeaderUserButton />
        </div>
      </div>
      <HeaderNavMenu
        anchorEl={anchorEl}
        open={NavMenuOpen}
        onClose={handleNavMenuClose}
        Value={props.Page}
        onValueChange={props.setChildPage}
      />
    </div>
  );
};