import { useEffect, useState } from "react";
import styled from "styled-components";
import { useMedia } from "../../../Hooks/useMedia";
import menuImage from "../../../Images/menu.png";
import Drawer from "../Drawer";
import LogoImage from "../../../Images/logo-black.png";
import closeImage from "../../../Images/x-icon.png";
const DrawerMenu = ({ menuItems, onClose }) => {
  return (
    <>
      <DrawerMenuWrapper>
        <img src={LogoImage} alt="Logo"></img>
        <StyledCloseButton
          onClick={onClose}
          src={closeImage}
          alt="Close button"
        ></StyledCloseButton>
      </DrawerMenuWrapper>
    </>
  );
};

const DrawerMenuWrapper = styled.div`
  padding-left: 18px;
  padding-top: 20px;
  display: flex;
`;

const StyledCloseButton = styled.img`
  margin-left: auto;
  padding-right: 16px;
  cursor: pointer;
`;

const Menu = ({
  menuItems,
  activeId,
  className,
  onMenuItemChanged,
  humburgerResolution = 880,
}) => {
  const breakPoints = [
    { min: 0, max: humburgerResolution, name: "mobile" },
    { min: humburgerResolution + 1, max: 10000, name: "desktop" },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const breakPoint = useMedia(breakPoints);

  return (
    <>
      <MenuWrapper className={className}>
        {breakPoint?.name === "mobile" && (
          <>
            <Hamburger
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              src={menuImage}
              alt="Burger menu"
            ></Hamburger>
            {isDrawerOpen && (
              <Drawer>
                <DrawerMenu onClose={() => setIsDrawerOpen(false)} />
              </Drawer>
            )}
          </>
        )}
        {breakPoint?.name === "desktop" &&
          menuItems.map((item) => {
            return (
              <MenuItem key={item.id}
                onClick={() => onMenuItemChanged(item)}
                active={activeId === item.id}
                href="#"
              >
                {item.name}
              </MenuItem>
            );
          })}
      </MenuWrapper>
    </>
  );
};

const MenuItem = styled.a`
  font-size: 20px;
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  text-decoration: none;
  ${(props) =>
    props.active &&
    `
    border-bottom: 2px solid #fff;
    `}
  color: #fff;
`;
const MenuWrapper = styled.nav`
  font-family: Assistant;
  display: flex;
  gap: 26px;
`;

const Hamburger = styled.img`
  cursor: pointer;
`;

export default Menu;
