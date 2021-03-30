import { Client } from "https://deno.land/x/postgres/mod.ts"
import { Product } from '../types.ts'
import { dbCreds } from '../config.ts'

// Init client
const client = new Client(dbCreds)

// @desc    Get all products
// @route   GET /api/v1/products
const getProducts = async ({ response }: { response: any }) => {
   try { 
        await client.connect()

        const result = await client.queryObject("SELECT * FROM products")

        const products:any = result.rows

        response.body = {
            success: true,
            data: products
        }
   } catch (err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
   } finally {
        await client.end()
   }
}

// @desc    Get single products
// @route   GET /api/v1/products/:id
const getProduct = async ({ params, response }: { params: { id: string }, response: any } ) => {
    try {
        await client.connect()
        const result = await client.queryObject("SELECT * FROM products WHERE id = $1", params.id)
        const product:any = result.rows
        if (product.toString() === "") {
            response.status = 404
            response.body = {
                success: false,
                msg: `No product with the id of ${params.id}`
            }
            return;
        } else {
            response.body = {
                success: true,
                data: product[0]
            }
        }
    } catch (err) {
       response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
   } finally {
        await client.end()
   }
}

// @desc    Add product
// @route   Post /api/v1/products
const addProduct = async ({ request, response }: { request: any, response: any }) => {
    const product = await request.body().value

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        try {
            await client.connect()
            const result = await client.queryArray("INSERT INTO products(name, description, price) VALUES($1,$2,$3)", 
            product.name,
            product.description,
            product.price)
            response.status = 201
            response.body = {
                success: true,
                data: product
            }
        } catch (err) {
            response.status = 500
            response.body = {
                success: false,
                msg: err.toString()
            }
        } finally {
            await client.end()
        }
    }
}

// @desc    Update product
// @route   PUT /api/v1/products/:id
const updateProduct = async ({ params, request, response }: { params: {id:string}, request: any, response: any }) => {
    await getProduct({ params: {"id": params.id}, response })
    console.log("test", response.status)

    if (response.status === 404) {
        response.body = {
            success: false,
            msg: response.body.msg
        }
        response.status = 404
        return;
    } else {
        const product = await request.body().value

        if (!request.hasBody) {
            response.status = 400
            response.body = {
                success: false,
                msg: 'No data'
            }
        } else {
            try {
                await client.connect()
                const result = await client.queryArray("UPDATE products SET name=$1,description=$2, price=$3 WHERE id=$4", 
                product.name,
                product.description,
                product.price,
                params.id)

                response.status = 200
                response.body = {
                    success: true,
                    data: product
                }
            } catch (err) {
                response.status = 500
                response.body = {
                    success: false,
                    msg: err.toString()
                }
            } finally {
                await client.end()
            }
        }

    }
}

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
const deleteProduct = async ({ params, response }: { params: {id :string}, response:any }) => {
   await getProduct({ params: {"id": params.id}, response })

    if (response.status === 404) {
        response.body = {
            success: false,
            msg: response.body.msg
        }
        response.status = 404
        return;
    } else {
        try {
            await client.connect()

            const result = await client.queryArray("DELETE FROM products WHERE id=$1", params.id)
            response.body = {
                success: true,
                msg: `Product with id ${params.id} has been deleted`
            }
            response.status = 204
        } catch (err) {
                response.status = 500
                response.body = {
                    success: false,
                    msg: err.toString()
                }
        } finally { await client.end() }
    }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }
