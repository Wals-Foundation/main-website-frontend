"use client"
import { Hero, ViewportBreakpoint } from '@/core/domain/models';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules"
import 'swiper/css';
import Image from '@/image/Image';
import { useAppSelector } from '@/logic/store/hooks';
import { Config } from '@/core/domain/config';

/*
    TEST CASES
    Number of heroes - 0,1,3
    Image aspect ratio - correct image name available (mobil & web), correct image name unavailable
    Slides - autoplay, interact
*/

const PageHeroes: React.FC<{
    className?: string,
    feature: string,
    heroes: Hero[]
}> = ({ className, feature, heroes }) => {
    const viewportBreakpoint = useAppSelector((state) => state.usePage.viewportBreakpoint)

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
                            <Image
                                feature={feature}
                                image={hero.image}
                                breakpoint={viewportBreakpoint ?? ViewportBreakpoint.Nonmobile}
                                widthClass="w-full"
                            />
                            {/* Puts an overlay over the images */}
                            <div className="absolute inset-0 bg-black/60" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </>
    )
}

export default PageHeroes