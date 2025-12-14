import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, totalResults, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 5;

        if (totalPages <= showPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {/* Results count */}
            <p className="text-sm text-muted-foreground">
                Showing page <span className="font-semibold text-foreground">{currentPage}</span> of{' '}
                <span className="font-semibold text-foreground">{totalPages}</span>
                {totalResults > 0 && (
                    <span className="hidden sm:inline">
                        {' '}({totalResults.toLocaleString()} total results)
                    </span>
                )}
            </p>

            {/* Pagination controls */}
            <div className="flex items-center gap-1">
                {/* First page */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="hidden sm:flex h-9 w-9 rounded-lg"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Previous page */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9 w-9 rounded-lg"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                        typeof page === 'number' ? (
                            <Button
                                key={index}
                                variant={currentPage === page ? 'default' : 'ghost'}
                                size="icon"
                                onClick={() => onPageChange(page)}
                                className={`h-9 w-9 rounded-lg ${currentPage === page ? 'shadow-lg shadow-primary/25' : ''
                                    }`}
                            >
                                {page}
                            </Button>
                        ) : (
                            <span key={index} className="px-2 text-muted-foreground">
                                {page}
                            </span>
                        )
                    ))}
                </div>

                {/* Next page */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 rounded-lg"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last page */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="hidden sm:flex h-9 w-9 rounded-lg"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
