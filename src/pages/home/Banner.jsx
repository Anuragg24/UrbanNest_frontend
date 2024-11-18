import React from "react";
import { Link } from 'react-router-dom'
import bannerimg from "../../assets/men-banner.png"
const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">up to 30% discount on </h4>
        <h1>LIFESTYLE</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          provident delectus alias veritatis illum corporis dicta, eligendi quod
          velit sequi numquam, expedita libero quia totam autem magnam
          exercitationem dolore animi.
        </p>
        <button className="btn"><Link to="/shop">Explore Now</Link></button>
      </div>
      <div className="header__image">
        <img src={bannerimg} alt="banner img"/>
      </div>
    </div>
  );
};

export default Banner;
