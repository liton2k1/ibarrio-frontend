import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    return (
        <div className="lg:w-3xl mx-auto lg:px-0 px-5 mt-20">
            <h1 className="text-3xl font-bold text-center capitalize mb-10">
                Frequently Asked Questions
            </h1>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">
                        What is Doorstep?
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Doorstep lets you create a simple page with clear directions so
                            delivery drivers, friends, and family can easily find your door.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">
                        Do I need to create an account?
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Nope! Just make your page and share the link.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl">Is it free?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Yes, it’s completely free!
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl">
                        Who can see my page?
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Only people you share the public link with. It’s not searchable or
                            listed anywhere.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                    <AccordionTrigger className="text-xl">
                        Can I edit my page later?
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Yes — you’ll get a private edit link when you publish. Save it
                            somewhere safe.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                    <AccordionTrigger className="text-xl">
                        What if I lose my edit link?
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            You’ll need to make a new page if the private link is lost.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                    <AccordionTrigger className="text-xl">
                        Do people need an app to view my page?
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-gray-600 text-lg">
                            Nope! Your page opens in any browser — no app required.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FAQ;
