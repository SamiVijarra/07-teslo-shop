import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import type { Product } from "@/interfaces/product.interface";
import { CreateUpdateProductAction } from "../actions/create-update-product.action";


export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const mutation = useMutation({
        mutationFn: CreateUpdateProductAction,
        onSuccess: (product: Product) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', {id: product.id}] });
            queryClient.setQueryData(['product', { id: product.id }], product);
        }
    });

//    const handleSubmitForm = async (productLike: Partial<Product>) => {
//        console.log('handleSubmitForm', productLike);
//    };

    return {
        ...query,
        mutation,
    };
}