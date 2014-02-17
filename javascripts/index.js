var currencies = ['SGD', 'USD', 'CNY', 'AUD']
var ticker = document.querySelector('#ticker tbody')

currencies.forEach(function(currency){
  var container = document.createElement('tr')
  container.className = currency.toLowerCase()
  ticker.appendChild(container)

  var label = document.createElement('td')
  label.textContent = currency
  container.appendChild(label)

  var price = document.createElement('td')
  price.className = "price"
  container.appendChild(price)
})

bitcoin.addExchangeRateListener(function(currency, amount){
  var price = document.querySelector('tr.' + currency.toLowerCase() + ' .price')
  price.textContent = bitcoin.userStringForCurrencyValue(amount)

  document.querySelector('.last-updated-at').textContent = "Last updated at: " + new Date()
})

currencies.forEach(function(currency){
  bitcoin.updateExchangeRate(currency)
})

document.querySelector('.donation').addEventListener('click', function(){
  bitcoin.sendMoney('1Bu3bhwRmevHLAy1JrRB6AfcxfgDG2vXRd', 10 * bitcoin.MBTC_IN_SATOSHI, function(success, transactionId){
    bitcoin.getTransaction(transactionId, function(t) {
      var btc = t.amount / bitcoin.BTC_IN_SATOSHI;
      alert('Thanks for sending Wei ' + btc + ' BTC!');
    });
  })
})
