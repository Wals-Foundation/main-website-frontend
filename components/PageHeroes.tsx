import { Hero, ViewportBreakpoint } from '@/core/domain/models';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules"
import 'swiper/css';
import Image from '@/image/Image';
import { useAppSelector } from '@/logic/store/hooks';

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
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000 }}
                >
                    {heroes.map((hero) => (
                        <SwiperSlide key={hero.id} className="w-full h-full">
                            <Image
                                feature={feature}
                                image={hero.image}
                                breakpoint={viewportBreakpoint ?? ViewportBreakpoint.Nonmobile}
                                widthClass="w-full" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </>
    )
}

export default PageHeroes