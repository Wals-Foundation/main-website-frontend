import { ImageSource } from "@/core/domain/models";

const featureViewportBreakpointAspectRatio: Record<string, string> = {
    home_hero_carousel_desktop: "16x9",
    home_hero_carousel_mobile: "2x3",
    cause_card_desktop: "1x1",
    cause_card_mobile: "1x1",
    gallery_desktop: "1x1",
    gallery_mobile: "1x1",
    about_hero_carousel_desktop: "16x9",
    about_hero_carousel_mobile: "2x3",
    cause_detail_desktop: "16x9",
    cause_detail_mobile: "3x2",
    activity_desktop: "1x1",
    activity_mobile: "1x1",
};

const aspectRatioRegex = (ratio: string): RegExp => {
    const escapedRatio = ratio.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    return new RegExp(`_${escapedRatio}(?=\\.[^.]+$)`);
};

function convertAspectRatioFormatForTailwindClass(aspect: string): string {
    return aspect.replace("x", "/");
}

const getFeatureViewportBreakpointImageSource = (
    feature: string,
    sources: ImageSource[]
): { aspectRatio: string; source: ImageSource } => {
    if (!sources.length) {
        throw new Error(`Image sources array is empty for feature "${feature}"`);
    }

    const rawRatio = featureViewportBreakpointAspectRatio[feature] ?? "4x3";
    const regex = aspectRatioRegex(rawRatio);
    const matched = sources.find((source) => regex.test(source.name));
    const selectedSource = matched ?? sources[0];
    const aspectRatio = convertAspectRatioFormatForTailwindClass(rawRatio);

    return {
        aspectRatio,
        source: selectedSource,
    };
};

export default getFeatureViewportBreakpointImageSource;
