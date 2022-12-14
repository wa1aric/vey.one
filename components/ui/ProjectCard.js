import Link from "./Link";
import Heading from "./Heading";
import Text from "./Text";
import Button from "./Button";

export default function ProjectCard({ project }) {

    const date = new Date(project.created_at)

    return (
        <div className="bg-white rounded-3xl flex flex-col gap-3 border p-5">
            <div className="flex flex-col flex-1 gap-1 ">
                <Link href={`/dashboard/${project.id}`}><Heading md>{project.title}</Heading></Link>
                <Text>{project.description}</Text>
            </div>
            <div className="flex flex-row place-content-between text-gray-400">
                <div>Created {date.toLocaleDateString()} &bull; {project.slides[0].count} slides</div>
                <div></div>
            </div>
            {/* <div className="flex justify-end gap-3">
                <Button>Delete</Button>
                <Button>Edit</Button>
            </div> */}
        </div>
    )
}