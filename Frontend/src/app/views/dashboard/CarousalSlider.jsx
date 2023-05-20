import React from 'react'
import Carousel from 'better-react-carousel'

export default function CarousalSlider() {
    return (
        <Carousel
            cols={1}
            rows={1}
            gap={0}
            loop={true}
            showDots
            autoplay={1000}
        >
            <Carousel.Item>
                <center>
                    <img width="800px" src="/assets/images/carousal/27.jpg" />
                </center>
            </Carousel.Item>
            <Carousel.Item>
                <center>
                    <img width="800px" src="/assets/images/carousal/24.jpg" />
                </center>
            </Carousel.Item>
            <Carousel.Item>
                <center>
                    <img width="800px" src="/assets/images/carousal/22.jpeg" />
                </center>
            </Carousel.Item>
            <Carousel.Item>
                <center>
                    <img width="800px" src="/assets/images/carousal/23.jpeg" />
                </center>
            </Carousel.Item>
            <Carousel.Item>
                <center>
                    <img width="800px" src="/assets/images/carousal/25.jpg" />
                </center>
            </Carousel.Item>
            <Carousel.Item>
                <center>
                    <img width="800px" src="/assets/images/carousal/29.jpg" />
                </center>
            </Carousel.Item>
        </Carousel>
    )
}
