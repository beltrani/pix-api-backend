const axios = require('axios')
const xlsx = require('xlsx')
const fs = require('fs');
const configHeaders = require('../config/configHeaders');
        
class product {
    
    // async getProductSpecification(req, res){
    //     const getSpecification = `${URL_VTEX_CATALOG}/products/${req.params.id}/specification`;
    //     const response = await axios.get(getSpecification, config);
    //     return res.json(response.data);
    // }

    async updateProductSpecification(req, res){
        const updateStatus = [];
        const URL_VTEX_CATALOG = `https://${req.params.store_id}.vtexcommercestable.com.br/api/catalog_system/pvt`;
        try {
            const productSheet = xlsx.readFile(`${req.file.destination}/${req.file.filename}`);
            const productList = productSheet.SheetNames;
            const productListJson = xlsx.utils.sheet_to_json(productSheet.Sheets[productList[0]]);

            const config = await configHeaders.getHeaders(req);

            for (let i = 0; i <= productListJson.length - 1; i++) {
                const product = productListJson[i];
                const updateBody = [];
                
                updateBody.push({
                    Value: [product.ValorEspecificacao], 
                    Id: product.IdCampo, 
                    Name: product.NomeCampo
                });

                const postSpecification = `${URL_VTEX_CATALOG}/products/${product._IdProduto}/specification`;
                const update = await axios.post(postSpecification, updateBody, config);
                updateStatus.push(product._IdProduto , update.status , update.statusText);

            }
        } catch (error) {
            console.log('Erro ao atualizar especificações do produto', error);
        }
        return res.json(updateStatus);
    }
}

module.exports = new product(); 

