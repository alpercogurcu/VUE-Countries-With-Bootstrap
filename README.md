# VUE Countries With Bootstrap
 
 [CANLI UYGULAMA](http://manolya.online/countries/)
 [(http://manolya.online/countries/)](http://manolya.online/countries/)
 
 ## Ne Yapar?
 https://restcountries.com/v2/all adresinden gelen ülke bilgilerini belirtilen başlıklarda listeler. <br>
 
 ## Tablo Başlıkları nasıl düzenlenir?
 Çekilen verileri `headers: ["name", "capital", "region", "flag"]` dizisi altında JSON'dan gelen objelerin başlıklarına göre tablolar. 
 
 ## Arama Sütunları nasıl düzenlenir? 
 Başlıklarda arama kutularını aktifleştirebilmek için  ` filterRow: ["capital"] ` dizisi içerisinde header'da yer alan keyler belirtilir
 Daha sonrasında ise 
 ```
 filters: {
      all: "",
      name: "",
      capital: "",
      region: "",
      flag: "",
    },
 ```
 
 filters objesinin içerisinde aranmaya açık başlıkların "key" bilgileri tanımlanır. <br>
` filters.all` nesnesi spesifiktir. JSON içerisindeki bütün key'lerde arama yapar. 
 

## Güncellemeler

[Version 0.1.1 - getObjectValuesWithFilter()](https://github.com/alpercogurcu/VUE-Countries-With-Bootstrap/blob/main/Updates.md#güncelleme-011)<br/>
[Version 0.1.2 - Fixed getObjectValuesWithFilter()](https://github.com/alpercogurcu/VUE-Countries-With-Bootstrap/blob/main/Updates.md#güncelleme-012)<br/>
[Version 0.1.3 - Dropdown Filter Area](https://github.com/alpercogurcu/VUE-Countries-With-Bootstrap/blob/main/Updates.md#güncelleme-013)<br/>




