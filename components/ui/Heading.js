export default function Heading({ children, md }) {
    return (
        <div className={`flex items-center font-bold gap-3 font-serif ${md ? "text-3xl font-bold" : "text-5xl"}`}>{children}</div>
    )
}