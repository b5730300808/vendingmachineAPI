const Firebase = require('../config')
class Money extends Firebase {
    async AddMoney(value){
        try{
            const money = await this.admin.firestore().collection("Money").doc("7PA7J7GTz9FyRDaOIc3k").get()
            .then(async(doc) => {
                let moneylist = doc.data()
                if(value.thousand !== ''){
                    if(moneylist.thousand !== ''){
                        let thousand = parseInt(value.thousand) + parseInt(moneylist.thousand)
                        moneylist.thousand = thousand.toString()
                    }
                    else{
                        moneylist.thousand = value.thousand
                    }
                }
                if(value.fivehundred !== ''){
                    if(moneylist.fivehundred !== ''){
                        let fivehundred = parseInt(value.fivehundred) + parseInt(moneylist.fivehundred)
                        moneylist.fivehundred = fivehundred.toString()
                    }
                    else{
                        moneylist.fivehundred = value.fivehundred
                    }
                }
                if(value.onehundred !== ''){
                    if(moneylist.onehundred !== ''){
                        let onehundred = parseInt(value.onehundred) + parseInt(moneylist.onehundred)
                        moneylist.onehundred = onehundred.toString()
                    }
                    else{
                        moneylist.onehundred = value.onehundred
                    }
                }
                if(value.fifty !== ''){
                    if(moneylist.fifty !== ''){
                        let fifty = parseInt(value.fifty) + parseInt(moneylist.fifty)
                        moneylist.fifty = fifty.toString()
                    }
                    else{
                        moneylist.fifty = value.fifty
                    }
                }
                if(value.twenty !== ''){
                    if(moneylist.twenty !== ''){
                        let twenty = parseInt(value.twenty) + parseInt(moneylist.twenty)
                        moneylist.twenty = twenty.toString()
                    }
                    else{
                        moneylist.twenty = value.twenty
                    }
                }
                if(value.ten !== ''){
                    if(moneylist.ten !== ''){
                        let ten = parseInt(value.ten) + parseInt(moneylist.ten)
                        moneylist.ten = ten.toString()
                    }
                    else{
                        moneylist.ten = value.ten
                    }
                }
                if(value.five !== ''){
                    if(moneylist.five !== ''){
                        let five = parseInt(value.five) + parseInt(moneylist.five)
                        moneylist.five = five.toString()
                    }
                    else{
                        moneylist.five = value.five
                    }
                }
                if(value.one !== ''){
                    if(moneylist.one !== ''){
                        let one = parseInt(value.one) + parseInt(moneylist.one)
                        moneylist.one = one.toString()
                    }
                    else{
                        moneylist.one = value.one
                    }
                }
                if(value.price !== ''){
                    let price = parseInt(value.price) + parseInt(doc.data().price)
                    moneylist.price = price
                }
                return await this.admin.firestore().collection("Money").doc("7PA7J7GTz9FyRDaOIc3k").set(moneylist).then((doc) => {
                        return {'success':true,message:'success'}
                    })
                    .catch((error) => {
                        console.log('Error updating user 2:', error.toJSON().message);
                        return {'success':false,message:error.toJSON().message}
                    });


            })
            .catch((error) => {
                console.log('Error updating user 2:', error.toJSON().message);
                return {'success':false,message:error.toJSON().message}
            });
            return money
        }
        catch(e){
            console.log(e)
            return {'success':false}
        }
    }
    async GetMoney(){
        try{
            const user = await this.admin.firestore().collection("Money").doc("7PA7J7GTz9FyRDaOIc3k").get()
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
    async BuyMenu(menu){
        try{
            const money = await this.admin.firestore().collection("Money").doc("7PA7J7GTz9FyRDaOIc3k").get()
            .then(async(value) => {
                return await this.admin.firestore().collection("MoneyStock").doc("19o6dfALOQqNS0rUpuuQ").get()
                .then((moneyStock) => {
                    let moneyStockList = moneyStock.data()
                    if(value.data().thousand !== ''){
                        let thousand =  parseInt(value.data().thousand) + parseInt(moneyStockList.thousand)
                        moneyStockList.thousand = thousand.toString()
                    }
                    if(value.data().fivehundred !== ''){
                        let fivehundred =  parseInt(value.data().fivehundred) + parseInt(moneyStockList.fivehundred)
                        moneyStockList.fivehundred = fivehundred.toString()
                    }
                    if(value.data().onehundred !== ''){
                        let onehundred =  parseInt(value.data().onehundred) + parseInt(moneyStockList.onehundred)
                        moneyStockList.onehundred = onehundred.toString()
                    }
                    if(value.data().fifty !== ''){
                        let fifty =  parseInt(value.data().fifty) + parseInt(moneyStockList.fifty)
                        moneyStockList.fifty = fifty.toString()
                    }
                    if(value.data().twenty !== ''){
                        let twenty =  parseInt(value.data().twenty) + parseInt(moneyStockList.twenty)
                        moneyStockList.twenty = twenty.toString()
                    }
                    if(value.data().ten !== ''){
                        let ten =  parseInt(value.data().ten) + parseInt(moneyStockList.ten)
                        moneyStockList.ten = ten.toString()
                    }
                    if(value.data().five !== ''){
                        let five =  parseInt(value.data().five) + parseInt(moneyStockList.five)
                        moneyStockList.five = five.toString()
                    }
                    if(value.data().one !== ''){
                        let one =  parseInt(value.data().one) + parseInt(moneyStockList.one)
                        moneyStockList.one = one.toString()
                    }
                    let returnPrice = value.data().price - menu.price;
                    let cashreturn = {
                        thousand:'',
                        fivehundred:'',
                        onehundred:'',
                        fifty:'',
                        twenty:'',
                        ten:'',
                        five:'',
                        one:'',                       
                    }
                    if(moneyStockList.thousand !== "" && moneyStockList.thousand !== "0"){
                        const countThousand = parseInt((returnPrice/1000).toString());
                        if(countThousand !== 0 && countThousand <= parseInt(moneyStockList.thousand)){
                            moneyStockList.thousand = (parseInt(moneyStockList.thousand)-countThousand).toString();
                            cashreturn.thousand = countThousand
                            returnPrice = returnPrice - countThousand*1000;
                        }
                    }
                    if(moneyStockList.fivehundred !== "" && moneyStockList.thousand !== "0"){
                        const countFivehundred = parseInt((returnPrice/500).toString());
                        if(countFivehundred !== 0 && countFivehundred <= parseInt(moneyStockList.fivehundred)){
                            moneyStockList.fivehundred = (parseInt(moneyStockList.fivehundred)-countFivehundred).toString();
                            cashreturn.fivehundred = countFivehundred
                            returnPrice = returnPrice - countFivehundred*500
                        }
                    }
                    if(moneyStockList.onehundred !== "" && moneyStockList.onehundred !== "0"){
                        const countOnehundred = parseInt((returnPrice/100).toString());
                        if(countOnehundred !== 0 && countOnehundred <= parseInt(moneyStockList.onehundred)){
                            moneyStockList.onehundred = (parseInt(moneyStockList.onehundred)-countOnehundred).toString();
                            cashreturn.onehundred = countOnehundred
                            returnPrice = returnPrice - countOnehundred*100
                        }
                    }
                    if(moneyStockList.fifty !== "" && moneyStockList.fifty !== "0"){
                        const countFifty = parseInt((returnPrice/50).toString());
                        if(countFifty !== 0 && countFifty <= parseInt(moneyStockList.fifty)){
                            moneyStockList.fifty = (parseInt(moneyStockList.fifty)-countFifty).toString();
                            cashreturn.fifty = countFifty
                            returnPrice = returnPrice - countFifty*50
                        }
                    }
                    if(moneyStockList.twenty !== "" && moneyStockList.fifty !== "0"){
                        const countTwenty = parseInt((returnPrice/20).toString());
                        if(countTwenty !== 0 && countTwenty <= parseInt(moneyStockList.twenty)){
                            moneyStockList.twenty = (parseInt(moneyStockList.twenty)-countTwenty).toString();
                            cashreturn.twenty = countTwenty
                            returnPrice = returnPrice - countTwenty*20
                        }
                    }
                    if(moneyStockList.ten !== "" && moneyStockList.ten !== "0"){
                        const countTen = parseInt((returnPrice/10).toString());
                        if(countTen !== 0 && countTen <= parseInt(moneyStockList.ten)){
                            moneyStockList.ten = (parseInt(moneyStockList.ten)-countTen).toString();
                            cashreturn.ten = countTen
                            returnPrice = returnPrice - countTen*10
                        }
                    }
                    if(moneyStockList.five !== "" && moneyStockList.five !== "0"){
                        const countFive = parseInt((returnPrice/5).toString());
                        if(countFive !== 0 && countFive <= parseInt(moneyStockList.five)){
                            moneyStockList.five = (parseInt(moneyStockList.five)-countFive).toString();
                            cashreturn.five = countFive
                            returnPrice = returnPrice - countFive*5
                        }
                    }
                    if(moneyStockList.one !== "" && moneyStockList.one !== "0"){
                        const countOne = parseInt((returnPrice).toString());
                        if(countOne !== 0 && countOne <= parseInt(moneyStockList.one)){
                            moneyStockList.one = (parseInt(moneyStockList.one)-countOne).toString();
                            cashreturn.one = countOne
                            returnPrice = returnPrice - countOne*1
                        }
                    }
                    // console.log("::Buy::",moneyStockList,cashreturn,returnPrice,menu)
                    if(returnPrice > 0){
                        return {'success':false,message:'MoneyStock not enough',money:cashreturn}
                    }
                    else{
                        return this.admin.firestore().collection("MoneyStock").doc("19o6dfALOQqNS0rUpuuQ").set(moneyStockList)
                        .then(async() => {
                            return await this.admin.firestore().collection("Money").doc("7PA7J7GTz9FyRDaOIc3k").set({
                                thousand:'',
                                fivehundred:'',
                                onehundred:'',
                                fifty:'',
                                twenty:'',
                                ten:'',
                                five:'',
                                one:'', 
                                price:0
                            })
                            .then(async() => {
                                return await this.admin.firestore().collection("Stock").doc(menu.id).update({amount: menu.amount - 1})
                                .then(async() => {
                                    console.log(cashreturn)
                                    return {'success':true,message:"กรุณารับสินค้า พร้อมเงินทอน",money:cashreturn}
                                })
                                .catch((error) => {
                                    return {'success':false,message:'error',money:cashreturn}
                                });
                            })
                            .catch((error) => {
                                console.log('Error updating user 2:', error);
                                return {'success':false,message:'error',money:cashreturn}
                            });
                        })
                        .catch((error) => {
                            console.log('Error updating user 2:', error);
                            return {'success':false,message:'error',money:cashreturn}
                        });
                    }
                })            
                .catch((error) => {
                    console.log('Error updating user 2:', error);
                    return {'success':false,message:'error'}
                });
            })
            .catch((error) => {
                console.log('Error updating user 2:', error);
                return {'success':false,message:'error'}
            });
            return money
        }
        catch(e){
            console.log(e)
            return {'success':false,message:'error'}
        }
    }
    async ReCashBack(){
        try{
            const money = await this.admin.firestore().collection("Money").doc("7PA7J7GTz9FyRDaOIc3k").set({
                thousand:'',
                fivehundred:'',
                onehundred:'',
                fifty:'',
                twenty:'',
                ten:'',
                five:'',
                one:'',
                price:0
            })
            .then(() => {
                return {'success':true,message:'success'}
            })
            .catch((error) => {
                console.log('Error updating user 2:', error);
                return {'success':false,message:'error'}
            });
            return money
        }
        catch(e){
            console.log(e)
            return {'success':false,message:'error'}
        }
    }
}
module.exports = Money;