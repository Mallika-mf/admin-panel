import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Image, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import Icofont from "react-icofont";

class CardItem extends React.Component {
  render() {
    if (this.props.showList === false) {
      return (
        <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
          <div className="list-card-image">
            {this.props.rating ? (
              <div className="star position-absolute">
                <Badge variant="success">
                  <Icofont icon="star" /> {this.props.rating}
                </Badge>
              </div>
            ) : (
              ""
            )}
            <div
              className={`favourite-heart position-absolute ${this.props.favIcoIconColor}`}
            >
              <Link to={this.props.linkUrl}>
                <i className="fa fa-circle"></i>
              </Link>
            </div>
            {this.props.showPromoted ? (
              <div className="member-plan position-absolute">
                <Badge variant={this.props.promotedVariant}>Promoted</Badge>
              </div>
            ) : (
              ""
            )}
            <Link to={this.props.linkUrl}>
              <div
                className="card-img-top img-responsive"
                style={{
                  height: "200px",
                  width: "100%",
                  overflow: "hidden",
                  alignItems: "center",
                }}
              >
                <Image
                  src={this.props.image}
                  style={{
                    maxWidth: "100%",
                    width: "150px",
                    objectFit: "cover",
                  }}
                  className={this.props.imageClass}
                  alt={this.props.imageAlt}
                />
              </div>
            </Link>
          </div>
          <div className="p-3 position-relative">
            <div className="list-card-body">
              <h6 className="mb-1">
                <Link to={this.props.linkUrl} className="text-black">
                  {this.props.title}
                </Link>
              </h6>
              {this.props.subTitle ? (
                <p className="text-gray mb-3">{this.props.subTitle}</p>
              ) : (
                ""
              )}
              {this.props.time || this.props.price ? (
                <p className="text-gray mb-3 time">
                  {this.props.time ? (
                    <span className="float-left bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2">
                      <Icofont icon="wall-clock" /> {this.props.time}
                    </span>
                  ) : (
                    ""
                  )}
                  {this.props.price ? (
                    <span className="float-right text-black-50">
                      {" "}
                      {this.props.price}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              ) : (
                ""
              )}
            </div>
            {/* {this.props.offerText ? (
                          <div className="list-card-badge">
                             <Badge variant={this.props.offerColor}>OFFER</Badge> <small>{this.props.offerText}</small>
                          </div>
                          )
                          :""
                      } */}
            <NavLink
              style={{ color: "white" }}
              to={{
                pathname: this.props.id,
                state: { product: this.props.product },
              }}
            >
              {/* <button className="ChefCardProfileButton"> View Items</button> */}
            </NavLink>
          </div>
        </div>
      );
    } else {
      return (
        <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
          <div className="list-card-image">
            {this.props.rating ? (
              <div className="star position-absolute">
                <Badge variant="success">
                  <Icofont icon="star" /> {this.props.rating}
                </Badge>
              </div>
            ) : (
              ""
            )}
            <div
              className={`favourite-heart position-absolute ${this.props.favIcoIconColor}`}
            >
              <i className="fa fa-circle"></i>
            </div>
            {this.props.showPromoted ? (
              <div className="member-plan position-absolute">
                <Badge variant={this.props.promotedVariant}>Promoted</Badge>
              </div>
            ) : (
              ""
            )}

            <div
              className="card-img-top img-responsive"
              style={{
                height: "200px",
                width: "100%",
                overflow: "hidden",
                alignItems: "center",
              }}
            >
              <Image
                src={this.props.image}
                style={{ maxWidth: "100%", width: "150px", objectFit: "cover" }}
                className={this.props.imageClass}
                alt={this.props.imageAlt}
              />
            </div>
          </div>
          <div className="p-3 position-relative">
            <div className="list-card-body">
              <h6 className="mb-1">{this.props.title}</h6>
              {this.props.subTitle ? (
                <p className="text-gray mb-3">{this.props.subTitle}</p>
              ) : (
                ""
              )}
              {this.props.time || this.props.price ? (
                <p className="text-gray mb-3 time">
                  {this.props.time ? (
                    <span className=" float-left bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2">
                      <Icofont icon="wall-clock" /> {this.props.time}
                    </span>
                  ) : (
                    ""
                  )}
                  {this.props.price ? (
                    <span className="float-right text-black-50">
                      {" "}
                      {this.props.price}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              ) : (
                ""
              )}
            </div>
            {/* {this.props.offerText ? (
                          <div className="list-card-badge">
                             <Badge variant={this.props.offerColor}>OFFER</Badge> <small>{this.props.offerText}</small>
                          </div>
                          )
                          :""
                      } */}

            {/* <button 
                disabled
                className="ChefCardProfileButton"
                >
                View Items
              </button>  */}
          </div>
        </div>
      );
    }
  }
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  offerText: PropTypes.string,
  offerColor: PropTypes.string,
  subTitle: PropTypes.array,
  time: PropTypes.string,
  price: PropTypes.string,
  showPromoted: PropTypes.bool,
  promotedVariant: PropTypes.string,
  favIcoIconColor: PropTypes.string,
  rating: PropTypes.number,
};
CardItem.defaultProps = {
  imageAlt: "",
  imageClass: "",
  offerText: "",
  offerColor: "success",
  subTitle: [],
  time: "",
  price: "",
  showPromoted: false,
  promotedVariant: "dark",
  favIcoIconColor: "",
  rating: "",
  product: [],
  id: "",
  available: true,
};

export default CardItem;
