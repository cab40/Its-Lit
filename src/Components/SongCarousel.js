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
      content: <SongCard height={"100%"} img_url="https://i.mdel.net/i/db/2019/12/1255378/1255378-800w.jpg" alt="3" title="Falling" artist="Harry Styles" stars={3}/>
    },
    {
      key: uuidv4(),
      content: <SongCard height = {"100%"} img_url="https://miro.medium.com/max/681/1*EBOL4lka5QjcYoxj6AHp-g.png" alt="1" title="Conversations" artist="Juice Wrld" stars={3}/>
    },
    {
      key: uuidv4(),
      content: <SongCard height={"100%"} img_url="https://i.imgur.com/aAEEK.jpeg" alt="2" title="Stronger" artist="Kanye West" stars={2}/>
    },
    {
      key: uuidv4(),
      content: <SongCard height={"100%"} img_url="https://cdn.vox-cdn.com/thumbor/Hpg3H7GrYqwnu-ivmqV8Tz4moXY=/0x81:493x410/1400x1400/filters:focal(0x81:493x410):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/49657923/Screen_Shot_2016-05-01_at_12.14.34_PM.0.0.png" title="No Problem" artist="Chance the Rapper" stars={1}/>
    },
    {
      key: uuidv4(),
      content: <SongCard height={"100%"} img_url="https://i.pinimg.com/originals/06/45/40/0645408494a6f638128af1037418cd88.jpg" title="Electric Feel" artist="MGMT" stars={2}/>
    }
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