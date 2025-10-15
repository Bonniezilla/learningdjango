import Section from "./Section";
import CreateProductPanel from "./CreateProductPanel";
import DeleteProductPanel from "./DeleteProductPanel";
import { useState } from "react";

function Sidebar() {
    const [open, setOpen] = useState(null);

    const toggle = (section) => {
        setOpen(open === section ? null : section);
    }

    return (
        <aside className="flex flex-col text-blaft-600 bg-antiflash rounded w-full h-full min-h-0 p-4">
            <h2 className="font-bold text-3xl">Manage products</h2>

            <Section
                title="Add Product"
                isOpen={open === "create"}
                onClick={() => toggle("create")}
            >
                <CreateProductPanel />
            </Section>

            <Section
                title="Update Product"
                isOpen={open === "update"}
                onClick={() => toggle("update")}
            ></Section>

            <Section
                title="Delete Product"
                isOpen={open === "delete"}
                onClick={() => toggle("delete")}
            >
                <DeleteProductPanel />
            </Section>
        </aside>
    )
}

export default Sidebar;