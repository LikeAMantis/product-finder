import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { range } from "../lib/utils";

export default function Pagination({ results, limit }) {
    const router = useRouter();
    const q = router.query.page;
    const currentPage = q ? parseInt(q) : 1;
    const pagesCount = Math.ceil(results / limit);
    const pageDiv = 0;
    const scrollContainerRef = useRef();

    useEffect(() => {
        scrollContainerRef.current.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            scrollContainerRef.current.scrollLeft += evt.deltaY;
        });
    }, []);

    return (
        <div className="flex w-full items-center justify-between overflow-hidden overflow-x-auto border-t border-gray-200 bg-white px-4 py-3 shadow-md sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                            {limit * (currentPage - 1) + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                            {Math.min(currentPage * limit, results)}
                        </span>{" "}
                        of <span className="font-medium">{results}</span>{" "}
                        results
                    </p>
                </div>
                <div ref={scrollContainerRef} className="overflow-x-auto">
                    <nav
                        className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        {/* Prev Page */}
                        <Link
                            href={{
                                query: {
                                    ...router.query,
                                    page: currentPage - 1,
                                },
                            }}
                        >
                            <button
                                disabled={currentPage <= 1}
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-200"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </Link>
                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

                        {/* First 4 */}
                        {
                            // range(1, Math.ceil(pagesCount))
                            range(1, pagesCount).map((count) => (
                                <Link
                                    href={{
                                        query: {
                                            ...router.query,
                                            page: count,
                                        },
                                    }}
                                >
                                    <a
                                        className={
                                            count === currentPage
                                                ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
                                                : `relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50`
                                        }
                                    >
                                        {count}
                                    </a>
                                </Link>
                            ))
                        }
                        {/* In Between */}

                        {/* Last 4 */}
                        {
                            // range(1, Math.ceil(pagesCount))
                            range(pagesCount - pageDiv + 1, pageDiv).map(
                                (count) => (
                                    <Link
                                        href={{
                                            query: {
                                                ...router.query,
                                                page: count,
                                            },
                                        }}
                                    >
                                        <a
                                            className={
                                                count === currentPage
                                                    ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
                                                    : `relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50`
                                            }
                                        >
                                            {count}
                                        </a>
                                    </Link>
                                )
                            )
                        }
                        {/* Next Page */}
                        <Link
                            href={{
                                query: {
                                    ...router.query,
                                    page: currentPage + 1,
                                },
                            }}
                        >
                            <button
                                disabled={currentPage >= pagesCount}
                                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-200"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className={`h-5 w-5`} />
                            </button>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
