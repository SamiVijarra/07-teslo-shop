import { CustomPagination } from "@/components/custom/CustomPagination"
import { useProducts } from "@/hooks/useProducts"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductGrid } from "@/shop/components/ProductsGrid"
import { useParams } from "react-router"

export const GenderPage = () => {    
    const {gender} = useParams();
    const {data} = useProducts();

    const genderLabel =

    gender === 'men' ? 'Men' : gender === 'women' ? 'Women' : 'Kids'
    return (
        <div>
            <CustomJumbotron title={`Products for ${genderLabel}`}/>
            <ProductGrid products={data?.products || []}/>
            <CustomPagination totalPages={data?.pages || 1}/>
        </div>
    )
}