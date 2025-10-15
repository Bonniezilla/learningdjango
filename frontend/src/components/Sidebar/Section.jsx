import { ChevronDown, ChevronRight } from "lucide-react";

function Section({ title, isOpen, onClick, children }) {

    return (
        <div className="border rounded bg-white shadow-2xl">
            <button className="px-2 flex justify-between w-full"
                onClick={onClick}
            >
                {title}
                {isOpen ? <ChevronDown /> : <ChevronRight />}
            </button>
            
            {isOpen && <div className="p-2 flex flex-col gap-2">{children}</div>}
        </div>
    )
}

export default Section;