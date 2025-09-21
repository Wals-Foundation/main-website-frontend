import NotFoundImage from "@/src/assets/images/404.svg"
import { Caption } from "../components/Typography"
import WebsiteLink from "../menu/ui/WebsiteLink"
import { FilledButton } from "../components/Button"
export default function NotFound() {
    return (
        <section className="mx-horizontal">
            <NotFoundImage className="mx-auto max-w-64 sm:max-w-96"/>
            <Caption text="Page not found" className="text-center mt-4"/>
            <WebsiteLink link="/">
                <FilledButton title="go home" className="mt-6 mx-auto block"/>
            </WebsiteLink>
        </section>
    )
}