import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
    return (
        <div className="lg:w-3xl mx-auto lg:px-0 px-5 mt-20">
            <h1 className="text-3xl font-bold text-center capitalize mb-10">Frequently Asked Questions</h1>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default FAQ;
