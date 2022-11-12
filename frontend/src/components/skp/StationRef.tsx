import { StationProps } from "../../pages/SKP";

export default function StationRef(props: StationProps) {
    return (
        <div className="flex flex-col gap-6 rounded p-6 border-[#E4E4E9] border-[1px]">
            <div className="flex items-center gap-4">
                <img className="rounded" src={`/images/skp/${props.image.split('/').pop()}`} alt="" />
                <h3 className="font-bold">{props.name}</h3>
            </div>
            <p className="text-[#74788D]">{props.desc}</p>
            <div className="flex items-center justify-between">
                <h4 className="font-semibold">{props.city}</h4>
                <h4 className="font-semibold">10 - 18</h4>
                <button className="text-primary font-semibold">Wyświetl</button>
            </div>
        </div>
    )
}