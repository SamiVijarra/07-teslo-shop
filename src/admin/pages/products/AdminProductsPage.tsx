import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";


export const AdminProductsPage = () => {
    return (
        <>
        <div className="flex justify-between items-center">
            <AdminTitle
            title="Products"
            subtitle="View and manage your products"
            />

            <div className="flex justify-end mb-10 gap-4">
                <Link to="/admin/products/new">
                <Button>
                    <PlusIcon/>
                    New Product
                </Button>
                </Link>
            </div>
        </div>

        <Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
            <TableHeader>
                <TableRow>
            <TableHead className="w-25">ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Accions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">1</TableCell>
                    <TableCell>
                        <img
                        src="https://placehold.co/250x250"
                        alt="Product"
                        className="w-20 h-20 object-cover rounded-md"
                        />
                    </TableCell>
                    <TableCell>Product 1</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>Category 1</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>xs, s, l, m</TableCell>
                    <TableCell className="text-right">
                        <Link to="/admin/products/t-shirt-teslo">Edit</Link>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <CustomPagination totalPages={10}/>
        </>
    )
};
