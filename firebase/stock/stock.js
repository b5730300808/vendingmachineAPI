const Firebase = require('../config')
const { v4: uuidv4 } = require('uuid');

const stream = require('stream');
class Stock extends Firebase {
    async GetStock(){
        try{
            return await this.admin.firestore().collection("Stock").get()
            .then(async (querySnapshot) => {
                let value = []
                await querySnapshot.forEach(async function(doc) {
                    // doc.data().id = doc.id
                    var data = doc.data()
                    data.id = doc.id
                    await value.push(data);
                });
                return value

            })
            .catch((error) => {
                console.log('Error updating user 2:',error);
                return {price:0}
            });
        }
        catch(e){
            console.log(e)
            return {'success':false}
        }
    }
    async DeleteStock(value){
        console.log('DeleteStock:')
        return await this.admin.firestore().collection("Stock").doc(value.id).delete()
        .then(async () => {
            return await this.admin.storage().bucket().deleteFiles({
                prefix: `${value.img.name}`
            })
            .then(function() {
                console.log("deleted successfully!");
                return {'success':true,message:'success'}
            })
            .catch(function() {
                console.log("unable to delete");
                return {'success':false,message:'error'}
            });

        })
        .catch((error) => {
            console.log('Error updating user 2:',error);
            return {'success':false,message:'error'}
        });
    }
    async AddStock(stock){
        try{
            const uid = uuidv4()
            const metadata = {
                metadata: {
                  firebaseStorageDownloadTokens: uid
                }
            };
            const date = new Date()
            const nameFile = date.getFullYear().toString()+date.getMonth().toString()+date.getDate().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()+date.getMilliseconds().toString()
            const file = this.admin.storage().bucket().file(`${nameFile}`)
            var bufferStream = new stream.PassThrough();
            bufferStream.end(Buffer.from(stock.img.path.split(';base64,')[1], 'base64'));
            await bufferStream.pipe(file.createWriteStream({
                contentType:'image/jpeg',
                metadata:metadata
            }))
            .on('error', function(err) {
                return {'success':false,message:'error'}
            })
            .on('finish', async function() {
                console.log('Upload Complete')
            });
            let url = `https://firebasestorage.googleapis.com/v0/b/vendingmachine-f3c55.appspot.com/o/${nameFile}?alt=media&token=${uid}`
            return await this.admin.firestore().collection("Stock").add({
                title:stock.title,
                img:{name:nameFile,url:url},
                price:stock.price,
                amount:stock.amount,
            })
            .then(async () => {
                return {'success':true,message:'success'}
            })
            .catch((error) => {
                console.log('Error updating user 2:',error);
                return {'success':false,message:'error'}
            });
        }
        catch(e){
            console.log(e)
            return {'success':false,message:'error'}
        }
        
    }
    async EditStock(stock){
        try{
            const uid = uuidv4()
            const metadata = {
                metadata: {
                  firebaseStorageDownloadTokens: uid
                }
            };
            // const date = new Date()
            const nameFile = stock.img.name
            const file = this.admin.storage().bucket().file(`${nameFile}`)
            var bufferStream = new stream.PassThrough();
            let url = `https://firebasestorage.googleapis.com/v0/b/vendingmachine-f3c55.appspot.com/o/${nameFile}?alt=media&token=${uid}`
            if(stock.img.url.indexOf(';base64,') !== -1){
                bufferStream.end(Buffer.from(stock.img.url.split(';base64,')[1], 'base64'));
                await bufferStream.pipe(file.createWriteStream({
                    contentType:'image/jpeg',
                    metadata:metadata
                }))
                .on('error', function(err) {
                    return {'success':false,message:'error'}
                })
                .on('finish', async function() {
                    console.log('Upload Complete')
                });
                url = `https://firebasestorage.googleapis.com/v0/b/vendingmachine-f3c55.appspot.com/o/${nameFile}?alt=media&token=${uid}`
            }
            else{
                url = stock.img.url;
            }
            return await this.admin.firestore().collection("Stock").doc(stock.id).update({
                title:stock.title,
                img:{name:nameFile,url:url},
                price:stock.price,
                amount:stock.amount,
            })
            .then(async () => {
                return {'success':true,message:'success'}
            })
            .catch((error) => {
                console.log('Error updating user 2:',error);
                return {'success':false,message:'error'}
            });
        }
        catch(e){
            console.log(e)
            return {'success':false,message:'error'}
        }
        
    }
}
module.exports = Stock;