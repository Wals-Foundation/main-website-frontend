import { fetchCauseDetail } from "@/src/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/src/cause/models"
import CauseDetailDisplay from "@/src/cause/ui/CauseDetailDisplay";
import { Config } from "@/src/core/config";
import { isStrapiError, StrapiError } from "@/src/core/data/strapi-error"

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
    ? async () => ([{ code: 'n' }])
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
                <CauseDetailDisplay
                    causeDetail={community}
                    causeDetailsUrl="/causes"
                />
            )}
        </>
    )
}