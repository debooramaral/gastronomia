import styles from "./navbar.module.css";
import { LuShoppingCart, LuUserRound, LuMenu } from "react-icons/lu";
import { Drawer } from "@mui/material";
import { useState } from "react";

export default function Navbar() {
  //Inicializo o menu suspenso como falso, fechado
  const [openMenu, setOpenMenu] = useState(false);

  //Quando eu clicar no menu suspenso, muda o estado deste menu, fazendo o contrario do menu que esta fechado, para aberto !openMenu
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarItems}>
        <img className={styles.logo} src="/chapeu-de-chef-monocromatico-com-colher-e-garfo_602006-29-removebg-preview.png" alt=""/>
        <div className={styles.navbarLinksContainer}>
          <a href="" className={styles.navbarLink}> Home</a>
          <a href="" className={styles.navbarLink}> Plates</a>
          <LuShoppingCart className={styles.navbarLink} />
          <LuUserRound className={styles.navbarLink} />
        </div>
      </div>

      <div className={styles.mobileNavbarItems}>
        <img className={styles.logo} src="/chapeu-de-chef-monocromatico-com-colher-e-garfo_602006-29-removebg-preview.png" alt=""/>
        <div className={styles.mobileNavbarBtns}>
          <LuShoppingCart className={styles.navbarLink} />
          <LuMenu className={styles.navbarLink} onClick={handleOpenMenu} />
        </div>
      </div>

      <Drawer anchor="right" open={openMenu} onClose={handleOpenMenu} >
        <div className={styles.drawer}>
            <a href="" className={styles.navbarLink}> Home</a>
            <a href="" className={styles.navbarLink}> Plates</a>
            <a href="" className={styles.navbarLink}> Profile</a>
        </div>
      </Drawer>
    </nav>
  );
}
