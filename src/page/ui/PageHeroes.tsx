"use client"
import { Hero } from '@/src/core/models';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules"
import 'swiper/css';
import { Config } from '@/src/core/config';
import PageHero from './PageHero';

/*
    TEST CASES
    Number of heroes - 0,1,3
    Image aspect ratio - correct image name available (mobil & web), correct image name unavailable
    Slides - autoplay, interact
*/


const PageHeroes: React.FC<{
    className?: string,
    aspectRatio?: string,
    feature?: string,
    heroes: Hero[]
}> = ({ className, aspectRatio, feature, heroes }) => {

    return (
        <div className={`w-full ${aspectRatio ?? "aspect-[2/3] sm:aspect-[16/9]"} ${className ?? ""}`}>
            <Swiper
                className={`w-full h-full ${className ?? ""}`}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: Config.images.slides.autoPlayDelay }}
                pagination={{ clickable: true }}
            >
                {heroes.map((hero) => (
                    <SwiperSlide key={hero.id} className="w-full h-full">
                        <PageHero
                            className="w-full h-full"
                            feature={feature}
                            image={hero.image}
                            html={hero.html}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default PageHeroes