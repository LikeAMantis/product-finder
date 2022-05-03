import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
    FilterIcon,
    MinusSmIcon,
    PlusSmIcon,
    XIcon,
} from "@heroicons/react/solid";
import { Children, Fragment, useState } from "react";
import { classNames } from "../lib/utils";

const MobileFilter = ({ children, className }) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className={className}
                onClick={() => setMobileFiltersOpen(true)}
            >
                <span className="sr-only">Filters</span>
                <FilterIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-40 flex lg:hidden"
                    onClose={setMobileFiltersOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative mr-auto flex h-full w-full max-w-[240px] flex-col overflow-y-auto bg-white px-4 py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between border-b-2 border-black px-4">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Filters
                                </h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {/* Filters */}
                            {children}
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
        </>
    );
};
export default MobileFilter;
