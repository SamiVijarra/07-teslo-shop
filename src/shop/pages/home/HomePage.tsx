
import { CustomPagination } from "@/components/custom/CustomPagination"
import { useProducts } from "@/hooks/useProducts"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductGrid } from "@/shop/components/ProductsGrid"

export const HomePage = () => {  
    
    const { data } = useProducts();
    return (
        <div>
            <CustomJumbotron title="Todos los productos"/>
            <ProductGrid products={data?.products || []}/>
            <CustomPagination totalPages={data?.pages || 0}/>
        </div>
    )
}