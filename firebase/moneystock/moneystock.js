const Firebase = require('../config')
class MoneyStock extends Firebase {
    async GetMoneyStock(){
        try{
            const user = await this.admin.firestore().collection("MoneyStock").doc("19o6dfALOQqNS0rUpuuQ").get()
            .then((value) => {
                return value.data()
            })
            .catch((error) => {
                console.log('Error updating user 2:', error.toJSON().message);
                return {price:0}
            });
            return user
        }
        catch(e){
            console.log(e)
            return {'success':false}
        }
    }
    async UpdateMoneyStock(value){
        try{
            const user = await this.admin.firestore().collection("MoneyStock").doc("19o6dfALOQqNS0rUpuuQ").update({
                [value.name]:value.amount
            })
            .then((value) => {
                return {'success':true}
            })
            .catch((error) => {
                console.log('Error updating user 2:', error.toJSON().message);
                return {'success':false}
            });
            return user
        }
        catch(e){
            console.log(e)
            return {'success':false}
        }
    }
}
module.exports = MoneyStock;