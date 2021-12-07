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
 

## GÜNCELLEME 0.0.1

`<div v-if="filterRow.indexOf(field.key) >= 0">` alanı daha önceden field.Label ile eşleşiyor mu diye kontrol ediyordu ve filterRow dizisi içerisinde Label'a uygun formatla saklanıyordu fakat Caption / Label değiştiğinde sorunlara yol açabileceği gözlemlendi. 
Label yerine artık Key değerleri ile listelenecek.
<hr/>

### getObjectValuesWithFilter()

``` js
  function getObjectValuesWithFilter(item, filterCriteria) {
        let trueCount = 0;
        Object.values(item).some((key) => {
          if (typeof key != "object") {
            if (String(key).toLowerCase().includes(filterCriteria)) trueCount++;
          } else {
            trueCount += getObjectValuesWithFilter(key, filterCriteria);
          }
        });
        return trueCount;
      }
```
Obje içindeki objelere dinamik ulaşabilmek ve içerisindeki tüm nesnelere uygunluğu var mı yok mu amacıyla yazılan bu fonksiyonda;<br />
`trueCount` değişkeni başrol almaktadır. `Object.values(item).some((key) => {})` fonksiyonu ile obje içerisindeki tüm nesnelerin (key:"value") value değerine ulaşabilmek ve belirtilen filtre bu değişkenlerde barınmakta mı diye bakmaktadır. 
Eğer böyle bir durum söz konusuysa trueCount'u 1 arttırıp, bir sonraki nesneye geçmektedir. 
( Direkt return ile dönüş yapınca diğer nesnelere girmeden mevcut item'den çıkma söz konusu olduğundan dolayı böyle bir algoritma geliştirilmiştir. ) 

Eğer nesne içerisinde bir nesne daha varsa; mevcut nesnenin `trueCount`'u ile; aynı fonksiyon çağırılarak (trueCount sıfırlanır ve mevcut keylerde var ise arttırılır. ) fonksiyondan gelen değer `trueCount` değişkenine eklenir. 


### if(!filterByColumn) 


```js
let filterByColumn = true;
      let filtered = [{}];

      if (this.filters.all != "") filterByColumn = false;
```
Her computed event'ı tetiklendiğinde üst blok başlangıçta çalışır. Bu blok genel arama yapılıp, yapılmadığını eğer yapıldıysa `if (this.filters.all != "") filterByColumn = false; ` kod satırı ile genel aramanın sütun bazlı filtrelemeleri ezeceğini belirtir. 



```js
if(FilterByColumn) {} else {
 filtered = [{}];

        filtered = this.items.filter((item) => {
          return Object.values(item).some((key) => {
            let trueCount = 0;
            trueCount += getObjectValuesWithFilter(
              key,
              this.filters.all.toLowerCase()
            );
  
            return trueCount > 0 ? true : false;
          });
        });
        }
```

burada ise fonksiyondan gelen değerler mevcut item'in trueCount değerine eklenir. Eğer trueCount > 0 'dan büyükse filter'e return değerini gönderir.


![turkce](https://user-images.githubusercontent.com/44155358/145020501-c115c162-1f08-48c5-a864-595b91bec1fe.png)

![Kyrgyzstani Som](https://user-images.githubusercontent.com/44155358/145020505-3a11afc3-71b2-4188-8747-0952ad228385.png)

![filterbyCapital](https://user-images.githubusercontent.com/44155358/145020584-3c26bcf1-9a75-457c-b9d3-45133532b66c.png)








