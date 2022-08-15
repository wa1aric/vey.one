import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Editor from "../../components/layouts/Editor";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import useSWR from "swr";
import withToken from "../../utils/withToken"
import fetcher from "../../utils/fetcher"
import ProjectPreferences from "../../components/layouts/ProjectPreferences";
import Integrations from "../../components/layouts/Integrations";
import Events from "../../components/layouts/Events";
import { MdOutlineFolder } from "react-icons/md"

export default function Project() {

    const router = useRouter()
    const { id } = router.query

    const { data, error } = useSWR(withToken(`/api/projects/${id}`), fetcher)

    if (error) {
        return (
            <div>error</div>
        )
    }

    if (!data) {
        return (
            <div>Loading...</div>
        )
    }

    const tabs = [
        {
            title: "Editor",
            view: <Editor projectId={id} />
        },
        {
            title: "Preferences",
            view: <ProjectPreferences id={id} />
        },
        {
            title: "Events",
            view: <Events />
        },
        {
            title: "Integrations",
            view: <Integrations id={id} />
        }
    ]

    return (
        <div className="flex flex-col gap-5">

            <Heading>{data.title ?? "Untitled"}</Heading>
            <Text>{data.description}</Text>

            <Tab.Group>
                <Tab.List className="flex space-x-5 overflow-x-scroll">
                    {tabs.map(({title}) => (
                        <Tab key={title} className={({ selected }) => `flex items-center justify-center gap-3 py-3 px-5 rounded ${selected ? "bg-green-300" : "bg-transparent hover:bg-white/30"} appearance-none focus:outline-none`}><MdOutlineFolder /> {title}</Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {tabs.map(({view}, idx) => (
                        <Tab.Panel key={idx}>
                            {view}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>

        </div>
    )
}