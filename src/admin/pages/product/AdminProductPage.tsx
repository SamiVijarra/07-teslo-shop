import { Navigate, useNavigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from '../products/ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';



export const AdminProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading, isError, data: product, mutation } = useProduct(id || '');

    const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subTitle =
    id === 'new'
        ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';
    
    const handleSubmit = async (productLike: Partial<Product>) => {
        await mutation.mutateAsync(productLike, {
            onSuccess: (data: Product) => {
                toast.success('Product saved successfully', {
                    position: 'top-right',
                });
                navigate(`/admin/products/${data.id}`);
            }, 
            onError: (error) => {
                console.log(error);
                toast.error('Error saving product');
            }
        });
    };

    if (isError) {
        return <Navigate to="/admin/products" />;
    }
    if (isLoading) {
        return <CustomFullScreenLoading />;
    }
    if (!product) {
        return <Navigate to="/admin/products" />;
    }
    return <ProductForm
        title= {title}
        subtitle={subTitle}
        product={product}
        onSubmit={handleSubmit} 
        isPending={mutation.isPending}
    />;
};
