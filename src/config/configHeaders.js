const {readFileSync}  = require('fs');

class configHeaders{
  async getHeaders(req) {
    try {
      const fileHeaders = await JSON.parse(readFileSync('headers.json', 'utf8'));
      const header = [];
      for (let i = 0; i <= fileHeaders.length - 1; i++){
        if (fileHeaders[i].storeId === req.params.store_id){
            const headers = fileHeaders[i].configHeader;
            header.push(headers);
          }
        }
      return header[0];
    } catch(err) {
      console.log('Erro lendo arquivo configHeaders', err);
    }
  }
  
}

module.exports = new configHeaders();
