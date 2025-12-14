import { Sparkles } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Branding */}
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span className="font-heading font-bold">
                            <span className="gradient-text">Ani</span>Search
                        </span>
                    </div>


                    {/* API Attribution */}
                    <p className="text-xs text-muted-foreground">
                        Powered by <span className="font-medium">AnimeDB API</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
