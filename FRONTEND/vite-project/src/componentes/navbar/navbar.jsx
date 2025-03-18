import styles from "./navbar.module.css";
import { LuShoppingCart, LuUserRound, LuMenu } from "react-icons/lu";
import { Drawer } from "@mui/material";
import { useState } from "react";

import { Link } from "react-router-dom";

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
        <Link to={'/'}>
          <img className={styles.logo}
            src="/chapeu-de-chef-monocromatico-com-colher-e-garfo_602006-29-removebg-preview.png"
            alt=""/>
        </Link>
        <div className={styles.navbarLinksContainer}>
          <Link to={'/'} className={styles.navbarLink}>Home</Link>
          <Link to={'/plates'} className={styles.navbarLink}>Plates</Link>
          <Link to={'/cart'}><LuShoppingCart className={styles.navbarLink} /></Link>
          <Link to={'/profile'}><LuUserRound className={styles.navbarLink} /></Link>
        </div>
      </div>

      <div className={styles.mobileNavbarItems}>
        <Link>
          <img className={styles.logo}
            src="/chapeu-de-chef-monocromatico-com-colher-e-garfo_602006-29-removebg-preview.png"
            alt=""/>
        </Link>
        <div className={styles.mobileNavbarBtns}>
          <Link to={'/cart'}><LuShoppingCart className={styles.navbarLink} /></Link>
          <Link><LuMenu className={styles.navbarLink} onClick={handleOpenMenu} /></Link>
        </div>
      </div>

      <Drawer anchor="right" open={openMenu} onClose={handleOpenMenu}>
        <div className={styles.drawer}>
          <Link to={'/'} className={styles.navbarLink}>Home</Link>
          <Link to={'/plates'} className={styles.navbarLink}>Plates</Link>
          <Link to={'/profile'} className={styles.navbarLink}>Profile</Link>
        </div>
      </Drawer>
    </nav>
  );
}
