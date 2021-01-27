import React from "react";
import googleplay from "./AboutUs-images/googelplay.png";
import appstore from "./AboutUs-images/appstore.png";

function OurApp() {
  return (
    <div className="our-app">
      <div className="app-links">
        <h3>Download the app</h3>
        <div className="underline"></div>
        <p id="link-txt" style={{ fontSize: "15px" }}>
          We'll send you a link,open it on your phone to download the app
        </p>
        <form>
          <input type="email" placeholder="Enter your email address" />
          <button>Send Link</button>
        </form>

        <div className="badges">
          <a
            href="https://play.google.com/store/apps/details?id=mothers.food.mothersfood"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={googleplay} alt="google" />
          </a>
          <a
            href="https://apps.apple.com/us/app/mothers-food/id1533947618"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={appstore} alt="google" />
          </a>
        </div>
      </div>
      <div className="youtube-vedio">
        {/* <iframe title="youtube-vdio"
                            width="700" 
                            height="250" 
                            src="https://www.youtube.com/embed/0SPwwpruGIA" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                    </iframe> */}
      </div>
    </div>
  );
}

export default OurApp;
