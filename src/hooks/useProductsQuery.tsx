import { useRef, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router";

export const useProductsQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentSizes = searchParams.get("sizes")?.split(",") || [];
    const price = searchParams.get("price") || "";
    const page = searchParams.get("page") || "1";
    const viewMode = searchParams.get("viewMode") || "grid";

    const handlePriceChange = (newPrice: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", "1");
    newParams.set("price", newPrice);
    setSearchParams(newParams);
};

    const handleSizeChanged = (size: string) => {
    const newParams = new URLSearchParams(searchParams);

    const updatedSizes = currentSizes.includes(size)
    ? currentSizes.filter((s) => s !== size)
    : [...currentSizes, size];

    newParams.set("page", "1");
    newParams.set("sizes", updatedSizes.join(","));

    setSearchParams(newParams);
};

    const nextPage = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(Number(page) + 1));
    setSearchParams(newParams);
};

    const handleViewModeChange = (mode: "grid" | "list") => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("viewMode", mode);
    setSearchParams(newParams);
};

const search = searchParams.get("search") || "";

const inputRef = useRef<HTMLInputElement>(null);

const query = searchParams.get('query') || '';

const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const query = inputRef.current?.value; 

    const newSearchParams = new URLSearchParams(searchParams);

    if (!query) {
        newSearchParams.delete('query'); 
    } else {
        newSearchParams.set('query', inputRef.current!.value);
    }

    setSearchParams(newSearchParams);
}

return {
    price,
    page,
    viewMode,
    currentSizes,
    search,
    inputRef,
    query,
    handlePriceChange,
    handleSizeChanged,
    nextPage,
    handleViewModeChange,
    handleSearch, 
};
};