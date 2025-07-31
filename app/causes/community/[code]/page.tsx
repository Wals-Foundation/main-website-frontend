import { fetchCauseDetail } from "@/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/cause/models"
import CauseDetailDisplay from "@/cause/ui/CauseDetailDisplay";
import { Config } from "@/core/config";
import { isStrapiError, StrapiError } from "@/core/data/strapi-error"

const getCommunityDetails = async (code: string): Promise<{ community: CauseDetail | null, error: StrapiError | null }> => {
    const result = await fetchCauseDetail(code, CauseType.Community);

    if (isStrapiError(result)) {
        return {
            community: null,
            error: result
        };
    }

    return {
        community: result[0],
        error: null
    };
};

export const generateStaticParams = Config.isStaticHost
    ? async () => (['n'])
    : undefined;

export default async function CommunityDetail({
    params,
}: {
    params: Promise<{ code: string }>
}) {
    const { code } = await params
    const { community } = await getCommunityDetails(code)
    return (
        <>
            {community && (
                <div className="w-11/12 mt-12 sm:mt-16 mb-12 mx-auto sm:max-w-[1440px]">
                    <CauseDetailDisplay causeDetail={community} />
                </div>
            )}
        </>
    )
}