import React, { Component } from "react";
import Carousel from "react-spring-3d-carousel";
import uuidv4 from "uuid";
import { config } from "react-spring";
import SongCard from "./SongCard";

class SongCarousel extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 1,
    showNavigation: false,
    config: config.gentle
  };

  slides = [
    {
      key: uuidv4(),
      content: <SongCard height={"100%"} img_url="https://i.mdel.net/i/db/2019/12/1255378/1255378-800w.jpg" alt="3" title="Golden" artist="Harry Styles" stars={3}/>
    },
    {
      key: uuidv4(),
      content: <SongCard height = {"100%"} img_url="https://miro.medium.com/max/681/1*EBOL4lka5QjcYoxj6AHp-g.png" alt="1" title="Conversations" artist="Juice Wrld" stars={3}/>
    },
    {
      key: uuidv4(),
      content: <SongCard height={"100%"} img_url="https://images.squarespace-cdn.com/content/v1/59e68533d7bdce9ebbc3cef8/1508314396682-AGNY197TJ8159B3L3BD7/graduation.jpg" alt="2" title="Stronger" artist="Kanye West" stars={2}/>
    },
  ].map((slide, index) => {
    return { ...slide, onClick: () => this.setState({ goToSlide: index }) };
  });

  render() {
    return (
      <div style={{ width: "60%", height: "500px", margin: "0 auto" }}>
        <Carousel
          style={{height: "20%", width: "100%"}}
          slides={this.slides}
          goToSlide={this.state.goToSlide}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
       </div>
    ) 
  }
}

export default SongCarousel;