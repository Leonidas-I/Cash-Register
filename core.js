function checkCashRegister(price, cash, cid) {
    let refund = cash - price,
        cidRevFil = [...cid].reverse().filter(item => item[1] > 0);          //reverse cash-in-drawer array then filter item have value > 0$
  
    // Here is your change, ma'am.
    let cashBack = {status: "", change: []};
    let currency = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    };
    let quotient = 0,
        remainder = 0,
        i = 0;
    while (i < cidRevFil.length) {
      quotient = Math.floor(refund/currency[cidRevFil[i][0]]);                        //u know what code doing here right ?
      remainder = Math.round((refund*100) % (currency[cidRevFil[i][0]]*100))/100;     //modify this line yourselft & use console.log()
      if (quotient != 0) {                                                           // to see what happen with % operator
        let max = quotient * currency[cidRevFil[i][0]];
        if (max > cidRevFil[i][1]) {
          cashBack.change.push(cidRevFil[i]);
          refund = remainder + max - cidRevFil[i][1];
        }
        else {
          cashBack.change.push([cidRevFil[i][0], max]);      //all while() doing here is like u refund in real life 
          refund = remainder;
        }
      }
      else refund = remainder;
      i++;
    }
    let cidTotal = cidRevFil.reduce((total, num, i) => total + cidRevFil[i][1], 0);   //total money u have in cid
    console.log(refund);
    if (cidTotal < cash - price || refund != 0) {
      cashBack.status = 'INSUFFICIENT_FUNDS';
      cashBack.change = [];
    }
    if (cidTotal == cash - price && refund == 0) {
      cashBack.status = 'CLOSED';
      cashBack.change = cid;
    }
    
    if (cidTotal > cash - price && refund == 0) {
      cashBack.status = 'OPEN';
    }
    return cashBack;
  }
  
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  
  
  console.clear();
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));  