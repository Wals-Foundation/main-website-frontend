"use client"
import { Hero } from '@/core/models';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules"
import 'swiper/css';
import { Config } from '@/core/config';
import PageHero from './PageHero';

/*
    TEST CASES
    Number of heroes - 0,1,3
    Image aspect ratio - correct image name available (mobil & web), correct image name unavailable
    Slides - autoplay, interact
*/


const PageHeroes: React.FC<{
    className?: string,
    heroes: Hero[]
}> = ({ className, heroes }) => {

    return (
        <>
            {
                <Swiper
                    className={`w-full ${className ?? ""}`}
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: Config.images.slides.autoPlayDelay }}
                    pagination={{ clickable: true }}
                >
                    {heroes.map((hero) => (
                        <SwiperSlide key={hero.id} className="w-full h-full">
                            <PageHero
                                className="w-full h-full"
                                image = {hero.image}
                                html={hero.html}
                             />
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </>
    )
}

export default PageHeroes