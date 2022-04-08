import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import { classNames } from "../lib/utils";

const sortOptions = [
    { name: "Price: Low to High", orderBy: "priceAsc" },
    { name: "Price: High to Low", orderBy: "priceDesc" },
    { name: "Shop", orderBy: "shop" },
    { name: "Category", orderBy: "category" },
];

const buttonIcon = (open) => {
    const Icon = open ? ChevronUpIcon : ChevronDownIcon;
    return (
        <Icon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-400"
            aria-hidden="true"
        />
    );
};

export default function Sort({ className }) {
    const [currentOption, setCurrentOption] = useState("priceAsc");
    const router = useRouter();

    return (
        <Menu
            as="div"
            className={classNames("relative inline-block text-left", className)}
        >
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-skin-base hover:text-gray-400">
                            Sort
                            {buttonIcon(open)}
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-skin-menu shadow-xl shadow-black ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {sortOptions.map((option) => (
                                    <Menu.Item key={option.name}>
                                        {({ active }) => (
                                            <a
                                                onClick={() => {
                                                    router.push({
                                                        query: {
                                                            ...router.query,
                                                            orderBy:
                                                                option.orderBy,
                                                        },
                                                    }),
                                                        setCurrentOption(
                                                            option.orderBy
                                                        );
                                                }}
                                                className={classNames(
                                                    option.orderBy ===
                                                        currentOption
                                                        ? "font-medium text-skin-muted"
                                                        : "text-skin-base",
                                                    active ? "bg-gray-600" : "",
                                                    "block cursor-pointer px-4 py-2 text-sm hover:bg-gray-600"
                                                )}
                                            >
                                                {option.name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}
