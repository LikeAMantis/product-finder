import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import useSideScroll from "../lib/useSideScroll";
import { range } from "../lib/utils";

export default function Pagination({ results, limit }) {
    const router = useRouter();
    const q = router.query.page;
    const currentPage = q ? parseInt(q) : 1;
    const pagesCount = Math.ceil(results / limit);
    const scrollContainerRef = useRef();

    useSideScroll(scrollContainerRef, 1);

    function prevPage() {
        router.push({
            query: {
                ...router.query,
                page: currentPage - 1,
            },
        });
    }

    function nextPage() {
        router.push({
            query: {
                ...router.query,
                page: currentPage + 1,
            },
        });
    }

    return (
        <div className="col-span-full flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={prevPage}
                    disabled={currentPage <= 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-200"
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage >= pagesCount}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-200"
                >
                    Next
                </button>
            </div>
            <div className="hidden w-full grid-cols-[auto_1fr] items-center gap-4 sm:grid">
                <div className="w-max">
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
                <nav
                    className="relative z-0 inline-flex w-full justify-end -space-x-px overflow-x-hidden rounded-md px-2"
                    aria-label="Pagination"
                >
                    {/* Prev Page */}

                    <button
                        onClick={prevPage}
                        disabled={currentPage <= 1}
                        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-200"
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

                    <div
                        className="flex overflow-x-hidden"
                        ref={scrollContainerRef}
                    >
                        {range(1, pagesCount).map((count) => (
                            <Link
                                key={count}
                                href={{
                                    query: {
                                        ...router.query,
                                        page: count,
                                    },
                                }}
                            >
                                <button
                                    className={
                                        count === currentPage
                                            ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
                                            : `relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50`
                                    }
                                >
                                    {count}
                                </button>
                            </Link>
                        ))}
                    </div>

                    {/* Next Page */}

                    <button
                        onClick={nextPage}
                        disabled={currentPage >= pagesCount}
                        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-200"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className={`h-5 w-5`} />
                    </button>
                </nav>
            </div>
        </div>
    );
}
