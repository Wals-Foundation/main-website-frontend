import { fetchCauseDetail } from "@/cause/data/cause-strapi-datasource"
import { CauseDetail, CauseType } from "@/cause/models"
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

export default async function CommunityDetail({
    params,
}: {
    params: Promise<{ code: string }>
}) {
    const { code } = await params
    const { community, error } = await getCommunityDetails(code)
    return (
        <p>{`I'm a ${community?.name} with ${code}`}</p>
    )
}