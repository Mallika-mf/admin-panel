import React from "react";
import OwlCarousel from "react-owl-carousel3";
import ProductBox from "../home/ProductBox";
import "./category.css";
class CategoriesCarousel extends React.Component {
  render() {
    return (
      <OwlCarousel
        nav
        loop
        {...options}
        className="owl-carousel-category owl-theme"
      >
        <div className="item">
          <ProductBox
            boxClass="osahan-category-item12"
            title="hello"
            image="img/list/American Food.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
        <div className="item1">
          <ProductBox
            boxClass="osahan-category-item12"
            title="Chicken"
            image="img/list/Chicken.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
        <div className="item1">
          <ProductBox
            boxClass="osahan-category-item12"
            title="Noodels"
            image="img/list/Chinese.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
        <div className="item1">
          <ProductBox
            boxClass="osahan-category-item12"
            title="Dessert"
            image="img/list/Dessert.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
        <div className="item1">
          <ProductBox
            boxClass="osahan-category-item12"
            title="Veg curry"
            image="img/list/Vegeterianj.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
        <div className="item1">
          <ProductBox
            boxClass="osahan-category-item12"
            title="Hamburgers"
            image="img/list/Hamburgers.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
        <div className="item1">
          <ProductBox
            boxClass="osahan-category-item12"
            title="Healthy"
            image="img/list/Healthy.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
        <div className="item1">
          <ProductBox
            boxClass="osahan-category-item12"
            title="Veg mix"
            image="img/list/Indian.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
        <div className="item1">
          <ProductBox
            boxClass="osahan-category-item12"
            title="Pizza"
            image="img/list/Pizza.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
        <div className="item1">
          <ProductBox
            boxClass="osahan-category-item12"
            title="Vegies"
            image="img/list/Vegeterianj.jpg"
            imageClass="img-fluid"
            imageAlt="carousel"
            linkUrl="#"
          />
        </div>
      </OwlCarousel>
    );
  }
}

const options = {
  responsive: {
    0: {
      items: 3,
    },
    600: {
      items: 4,
    },
    1000: {
      items: 6,
    },
    1200: {
      items: 8,
    },
  },
  loop: true,
  lazyLoad: true,
  autoplay: true,
  dots: false,
  autoplaySpeed: 1000,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
};

export default CategoriesCarousel;
