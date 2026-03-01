import { CustomPagination } from "@/components/custom/CustomPagination"
import { products } from "@/mocks/products.mock"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductGrid } from "@/shop/components/ProductsGrid"
import { useParams } from "react-router"

export const GenderPage = () => {    
    const {gender} = useParams();

    const genderLabel =

    gender === 'men' ? 'Men' : gender === 'women' ? 'Women' : 'Kids'
    return (
        <div>
            <CustomJumbotron title={`Products for ${genderLabel}`}/>
            <ProductGrid products={products}/>
            <CustomPagination totalPages={7}/>
        </div>
    )
}