import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function AnimeCardSkeleton() {
    return (
        <Card className="overflow-hidden bg-card/50 border-0 shadow-xl">
            <div className="relative aspect-[3/4]">
                <Skeleton className="absolute inset-0" />

                {/* Fake ranking badge */}
                <div className="absolute top-3 left-3">
                    <Skeleton className="h-6 w-12 rounded-lg" />
                </div>

                {/* Fake favorite button */}
                <div className="absolute top-3 right-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                {/* Fake title area */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <div className="flex gap-1 mt-2">
                        <Skeleton className="h-4 w-12 rounded-full" />
                        <Skeleton className="h-4 w-14 rounded-full" />
                        <Skeleton className="h-4 w-10 rounded-full" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
