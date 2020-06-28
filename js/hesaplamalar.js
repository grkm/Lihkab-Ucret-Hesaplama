function yuvarla(sonuc, basamak) {
    return Number(Math.round(sonuc+'e'+basamak)+'e-'+basamak);
}

function nullkontrol(m,n){
    if (m == '' || m == null || m == undefined) {
        m = n;
        return m;
    }
    else {
        return m;
    }
}

function islemucreti(brut, kontrollukdurum, stopajdurum, yol) {
    //Kullanıcının girdiği veriler alınıp ilk değişkenler hesaplanıyor
    brut=Number(document.getElementById("brut").value);
    yol=Number(document.getElementById("yol").value);
    var kdv=brut*0.18;
    kdv = Number(kdv.toFixed(2));
    var brutkdv=brut+kdv;
    var damgaonay =  brut*0.00948;
    damgaonay = Number(damgaonay.toFixed(2));
    var sozlesmebedeli = 8.5;
    var blg = brutkdv*0.05;
    blg = Number(blg.toFixed(2));
    var knt = brutkdv*0.05;
    knt = Number(knt.toFixed(2));

    //Kontrollük durumuna göre hesaplama yapılıyor
    kontrollukdurum = document.getElementById("kontrollukKontrol");
    if (kontrollukdurum.checked == false){
        var kontrolluk = blg;
        document.getElementById('kontrolluk').innerHTML="0";
    }
    else {
        var kontrolluk = blg+knt;
        document.getElementById('kontrolluk').innerHTML=knt;
    }

    //Stopaj durumuna göre hesaplama yapılıyor
    stopajdurum = document.getElementById("stopajKontrol");
    if (stopajdurum.checked == false){
        var stopaj = 0;
    }
    else {
        var stopaj = brut*0.2;
        stopaj = Number(stopaj.toFixed(2));
        brutkdv=brut+kdv-stopaj;
    }

    //Değişkenlere göre işlem ücreti hesaplanıyor
    var toplamek=kontrolluk+yol+damgaonay+sozlesmebedeli;
    var toplam=brut+kdv+kontrolluk-stopaj+yol+sozlesmebedeli+damgaonay;
    toplam = yuvarla(toplam, 2);

    //Sonuçların ekrana yazdırılması kısmı
    document.getElementById('sonuc').innerHTML=toplam;
    document.getElementById('brutson').innerHTML=brut;
    document.getElementById('kdv').innerHTML=kdv;
    document.getElementById('belge').innerHTML=blg;
    document.getElementById('kontrolluktoplam').innerHTML=kontrolluk;
    document.getElementById('stopaj').innerHTML=stopaj;
    document.getElementById('brutkdv').innerHTML=brutkdv;
    document.getElementById('damgaonay').innerHTML=damgaonay;
    document.getElementById('sozlesmebedeli').innerHTML=sozlesmebedeli;
    document.getElementById('yolson').innerHTML=yol;
    document.getElementById('toplamek').innerHTML=toplamek;
}

function nitelik(durum){
    if (durum == "İmar Parseli (1/1)"){
        return Number(1);
    }
    if (durum == "Belediye İçinde Kadastro Parseli (2/3)"){
        return 2/3;
    }
    if (durum == "Belediye Dışında Kadastro Parseli (1/3)"){
        return 1/3;
    }
}

function enazkontrol(islem){
    var enaz = yuvarla(Number(localStorage.getItem("ayarEnAzUcret"))/1.18, 2);
    var hesaplanan  = islem;
    if(islem > 0 && islem < enaz) {
        return enaz;
    }
    else {
        return hesaplanan;
    }
}

function yolhesapla(km){
    km=Number(document.getElementById("kmbilgisi").value);
    var yolkatsayi = Number(localStorage.getItem("ayarYakitkm"));
    var yolyakitlt = Number(localStorage.getItem("ayarYakitlt"))
    yolsonuc=km*yolkatsayi*yolyakitlt;

    yolsonuc = yuvarla(yolsonuc, 2);
    document.getElementById('sonucyol').innerHTML=yolsonuc;
    document.getElementById("yol").value=yolsonuc;
}

function aplikasyonbrut(parselalanapl) {
    parselalanapl=Number(document.getElementById("parselalanapl").value);
    var nitelikkatsayi = nitelik(document.getElementById("nitelikapl").value);
    var sehir = localStorage.getItem("ayarSehir");
    var aplikasyonbrut;

    if(parselalanapl<=1000)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl1"))/1.18)*sehir*nitelikkatsayi;
    }
    else if(1000<parselalanapl & parselalanapl<=3000)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl2"))/1.18)*sehir*nitelikkatsayi;
    }
    else if(3000<parselalanapl & parselalanapl<=5000)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl3"))/1.18)*sehir*nitelikkatsayi;
    }
    else if(5000<parselalanapl & parselalanapl<=10000)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl4"))/1.18)*sehir*nitelikkatsayi;
    }
    else if(10000<parselalanapl & parselalanapl<=20000)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl5"))/1.18)*sehir*nitelikkatsayi;
    }
    else if(20000<parselalanapl & parselalanapl<=50000)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl6"))/1.18)*sehir*nitelikkatsayi;
    }
    else if(50000<parselalanapl & parselalanapl<=100000)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl7"))/1.18)*sehir*nitelikkatsayi;
    }
    else if(100000<parselalanapl & parselalanapl<=200000)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl8"))/1.18)*sehir*nitelikkatsayi;
    }
    else if(200000<parselalanapl & parselalanapl<=500000)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl9"))/1.18)*sehir*nitelikkatsayi;
    }
    else if(500000<parselalanapl)
    {
        aplikasyonbrut = (Number(localStorage.getItem("ayarApl9"))/1.18)*sehir*nitelikkatsayi;
        aplikasyonbrut = yuvarla(aplikasyonbrut, 2);
        var kactane100000 = Math.ceil((( parselalanapl - 500000 )/100000));
        var aplikasyonbrut2 = (Number(localStorage.getItem("ayarApl10"))/1.18)*sehir*nitelikkatsayi*kactane100000;
        aplikasyonbrut2 = yuvarla(aplikasyonbrut2, 2);
        aplikasyonbrut = aplikasyonbrut + aplikasyonbrut2;    
    }

    aplikasyonbrut = enazkontrol(aplikasyonbrut);
    aplikasyonbrut = yuvarla(aplikasyonbrut, 2);
    document.getElementById('brutapl').innerHTML=aplikasyonbrut;
    document.getElementById("brut").value=aplikasyonbrut;
    document.getElementById("aplbrutrpr").value=aplikasyonbrut;
}

function yapilihalegelmebrut(yapitabanalanicins) {
    yapitabanalanicins = Number(document.getElementById("yapitabanalanicins").value);
    var ilavebinacins = Number(document.getElementById("ilavebinacins").value);
    var nitelikkatsayicins = nitelik(document.getElementById("nitelikcins").value);

    var sehircins = localStorage.getItem("ayarSehir");
    var yapilihalegelmebrut;

    ilavebinacins = nullkontrol(ilavebinacins,0);

    if (yapitabanalanicins<=500) {
        var tabanalani = (Number(localStorage.getItem("ayarCins1"))/1.18)*sehircins*nitelikkatsayicins;
        var ilavebina = (Number(localStorage.getItem("ayarCins3"))/1.18)*ilavebinacins;
        yapilihalegelmebrut = tabanalani+ilavebina;
    }
    else if (yapitabanalanicins>500) {
        var herbirmetreicin = yapitabanalanicins - 500;
        var tabanalani = (Number(localStorage.getItem("ayarCins1"))/1.18)*sehircins*nitelikkatsayicins;
        var ilavetabanalani = (Number(localStorage.getItem("ayarCins2"))/1.18)*sehircins*nitelikkatsayicins*herbirmetreicin;
        var ilavebina = (Number(localStorage.getItem("ayarCins3"))/1.18)*ilavebinacins;
        yapilihalegelmebrut = tabanalani+ilavebina+ilavetabanalani;
    }

    tarimsalyapidurum = document.getElementById("tarimsalyapicins");
    var tarimsaltavan = yuvarla(Number(localStorage.getItem("ayarCins8"))/1.18, 2);
    if(tarimsalyapidurum.checked == true && yapilihalegelmebrut > tarimsaltavan) {
        yapilihalegelmebrut = tarimsaltavan;
    }
    
    yapilihalegelmebrut = enazkontrol(yapilihalegelmebrut);
    yapilihalegelmebrut = yuvarla(yapilihalegelmebrut, 2);
    document.getElementById('brutyapilicins').innerHTML=yapilihalegelmebrut;
    document.getElementById("brut").value=yapilihalegelmebrut;
}

function birlestirmebrut(birlestirmepsayisi) {
    birlestirmepsayisi = Number(document.getElementById("parselsayisibirlestirme").value);
    var nitelikkbirlestirme = nitelik(document.getElementById("nitelikbirlestirme").value);
    var sehirbirlestirme = localStorage.getItem("ayarSehir");
    var ayarb1 = (Number(localStorage.getItem("ayarBirl1"))/1.18);
    var ayarb2 = Number(localStorage.getItem("ayarBirl2"));
    var birlestirmebrutsonuc;

    birlestirmepsayisi = nullkontrol(birlestirmepsayisi,2);

    if (birlestirmepsayisi>2){
        birlestirmebrutsonuc = ayarb1*sehirbirlestirme*nitelikkbirlestirme;
        birlestirmebrutsonuc = birlestirmebrutsonuc+birlestirmebrutsonuc*(birlestirmepsayisi-2)*(ayarb2/100);
    }

    else {
        birlestirmebrutsonuc = ayarb1*sehirbirlestirme*nitelikkbirlestirme;
    }

    birlestirmebrutsonuc = enazkontrol(birlestirmebrutsonuc);
    birlestirmebrutsonuc = yuvarla(birlestirmebrutsonuc, 2);
    document.getElementById('brutbirlestirme').innerHTML=birlestirmebrutsonuc;
    document.getElementById("brut").value=birlestirmebrutsonuc;
}

function bbdbrut(bbdbbsayisi) {
    bbdbbsayisi = Number(document.getElementById("bbsayisibbd").value);
    var ayarbbd1 = (Number(localStorage.getItem("ayarBbd1"))/1.18);
    var ayarbbd2 = (Number(localStorage.getItem("ayarBbd2"))/1.18);
    var bbdbrutsonuc;

    bbdbbsayisi = nullkontrol(bbdbbsayisi,2);

    if (bbdbbsayisi>2){
        bbdbrutsonuc = ayarbbd1+(bbdbbsayisi-2)*ayarbbd2;
    }

    else {
        bbdbrutsonuc = ayarbbd1;
    }

    //bbdbrutsonuc = enazkontrol(bbdbrutsonuc); Maktu olduğu için buna gerek yok
    bbdbrutsonuc = yuvarla(bbdbrutsonuc, 2);
    document.getElementById('brutbbd').innerHTML=bbdbrutsonuc;
    document.getElementById("brut").value=bbdbrutsonuc;
}

function irtifakbrut(irtifakpsayisi) {
    irtifakpsayisi = Number(document.getElementById("parselsayisiirtifak").value);
    var nitelikkirtifak = nitelik(document.getElementById("nitelikirtifak").value);
    var sehirirtifak = localStorage.getItem("ayarSehir");
    var ayarirt1 = (Number(localStorage.getItem("ayarIrt1"))/1.18);
    var ayarirt2 = (Number(localStorage.getItem("ayarIrt2"))/1.18);
    var irtifakbrutsonuc;

    irtifakpsayisi = nullkontrol(irtifakpsayisi,2);

    if (irtifakpsayisi>2){
        irtifakbrutsonuc = ayarirt1*sehirirtifak*nitelikkirtifak+(irtifakpsayisi-2)*ayarirt2;
    }

    else {
        irtifakbrutsonuc = ayarirt1*sehirirtifak*nitelikkirtifak;
    }

    irtifakbrutsonuc = enazkontrol(irtifakbrutsonuc);
    irtifakbrutsonuc = yuvarla(irtifakbrutsonuc, 2);
    document.getElementById('brutirtifak').innerHTML=irtifakbrutsonuc;
    document.getElementById("brut").value=irtifakbrutsonuc;
}

function yolaplbrut(yaplnoktasayisi){
    yaplnoktasayisi = Number(document.getElementById("noktasayisiyapl").value);
    var ayaryapl1 = (Number(localStorage.getItem("ayarAply1"))/1.18);
    var ayaryapl2 = (Number(localStorage.getItem("ayarAply2"))/1.18);
    var yolaplsonuc;

    if (yaplnoktasayisi>10){
        yolaplsonuc = ayaryapl1+(yaplnoktasayisi-10)*ayaryapl2;
    }

    else {
        yolaplsonuc = ayaryapl1;
    }

    yolaplsonuc = yuvarla(yolaplsonuc, 2);
    document.getElementById('brutyapl').innerHTML=yolaplsonuc;
    document.getElementById("brut").value=yolaplsonuc;
}

function zttbrut(zttyapitabanalani){
    zttyapitabanalani = Number(document.getElementById("yapitabanalaniztt").value);
    var ayarztt1 = (Number(localStorage.getItem("ayarZtt1"))/1.18);
    var ayarztt2 = (Number(localStorage.getItem("ayarZtt2"))/1.18);
    var zttsonuc;

    if (zttyapitabanalani>100){
        zttsonuc = ayarztt1+(Math.ceil(zttyapitabanalani-100))*ayarztt2;
    }

    else {
        zttsonuc = ayarztt1;
    }

    zttsonuc = enazkontrol(zttsonuc);
    zttsonuc = yuvarla(zttsonuc, 2);
    document.getElementById('brutztt').innerHTML=zttsonuc;
    document.getElementById("brut").value=zttsonuc;
}

function rprbrut(){
    aplikasyonbrutrpr=Number(document.getElementById("aplbrutrpr").value);
    ekbinasayisirpr=Number(document.getElementById("ekbinarpr").value);
    rprsehir = localStorage.getItem("ayarSehir");
    ayarrpr1 = (Number(localStorage.getItem("ayarRpr1"))/1.18);

    aplikasyonbrutrpr = nullkontrol(aplikasyonbrutrpr,(Number(localStorage.getItem("ayarApl1"))/1.18)*rprsehir);
    ekbinasayisirpr = nullkontrol(ekbinasayisirpr,0);

    rprsonuc = aplikasyonbrutrpr + (ekbinasayisirpr+1)*ayarrpr1;

    rprsonuc = enazkontrol(rprsonuc);
    rprsonuc = yuvarla(rprsonuc, 2);
    document.getElementById('brutrpr').innerHTML=rprsonuc;
    document.getElementById("brut").value=rprsonuc;
}

function vazbagbrut(){
    vazbagparselalani = Number(document.getElementById("parselalanivazbag").value);
    vazbagilavebinasayisi = Number(document.getElementById("ilavebinasayisivazbag").value);
    vazbagbinakatsayisi = Number(document.getElementById("binakatsayisivazbag").value);
    vazbagbbsayisi = Number(document.getElementById("bbsayisivazbag").value);
    vazbagilcekatsayisi = Number(document.getElementById("ilcekatsayisivazbag").value);
    //vazbagilcekatsayisi = 1;
    vbpkatsayi = 1;
    ayarvbp1 = Number(localStorage.getItem("ayarVbp1")); // 0 - 500 m 2
    ayarvbp2 = Number(localStorage.getItem("ayarVbp2")); // 501 -1000 m 2 ‘ye kadar her 100 m 2 için
    ayarvbp3 = Number(localStorage.getItem("ayarVbp3")); // 1001 - 2500 m 2 ‘ye kadar her 100 m 2 için
    ayarvbp4 = Number(localStorage.getItem("ayarVbp4")); // 2501 - 10.000 m 2 ’ye kadar her 100 m 2 için
    ayarvbp5 = Number(localStorage.getItem("ayarVbp5")); // 10.000 m 2 ‘den sonraki her 1000 m 2 için
    ayarvbp6 = Number(localStorage.getItem("ayarVbp6")); // Aynı parsel içerisinde her fazla bina için
    // (Her binanın her katı ve her bağımsız bölümleri için aşağıdaki bedeller ilave edilir.)
    ayarvbp7 = Number(localStorage.getItem("ayarVbp7")); // Binanın her katı için
    ayarvbp8 = Number(localStorage.getItem("ayarVbp8")); // Binadaki her bağımsız bölüm için

    vazbagtaksdurum = document.getElementById("taksvazbag");

    if(vazbagtaksdurum.checked == true) { vbpkatsayi = 0.5; }

    vazbagparselalani = nullkontrol(vazbagparselalani,0);
    vazbagilavebinasayisi = nullkontrol(vazbagilavebinasayisi,0);
    vazbagbinakatsayisi = nullkontrol(vazbagbinakatsayisi,0);
    vazbagbbsayisi = nullkontrol(vazbagbbsayisi,0);
    vazbagilcekatsayisi = nullkontrol(vazbagilcekatsayisi,1);

    if (vazbagparselalani>501 && vazbagparselalani<1001){ 
        vazbagparselalani = vazbagparselalani - 501;
        vazbagparselalani = Math.ceil(vazbagparselalani/100);
        vazbagsonuc = ayarvbp1 + vazbagparselalani*ayarvbp2; 
    }
    else if (vazbagparselalani>1001 && vazbagparselalani<2501){
        vazbagparselalani = vazbagparselalani - 1001;
        vazbagparselalani = Math.ceil(vazbagparselalani/100);
        vazbagsonuc = ayarvbp1 + ayarvbp2*5 + vazbagparselalani*ayarvbp3;
    }
    else if (vazbagparselalani>2501 && vazbagparselalani<1000){
        vazbagparselalani = vazbagparselalani - 2501;
        vazbagparselalani = Math.ceil(vazbagparselalani/100);
        vazbagsonuc = ayarvbp1 + ayarvbp2*5 + ayarvbp3*15 + vazbagparselalani*ayarvbp4;
    }
    else if (vazbagparselalani>10000){
        vazbagparselalani = vazbagparselalani - 10001;
        vazbagparselalani = Math.ceil(vazbagparselalani/1000);
        vazbagsonuc = ayarvbp1 + ayarvbp2*5 + ayarvbp3*15 + ayarvbp4*75 + vazbagparselalani*ayarvbp5;
    }
    else { vazbagsonuc = ayarvbp1; }

    vazbagsonuc = vazbagilcekatsayisi*vbpkatsayi*(vazbagsonuc + vazbagilavebinasayisi*ayarvbp6+vazbagbinakatsayisi*ayarvbp7+vazbagbbsayisi*ayarvbp8); 

    vazbagsonuc = yuvarla(vazbagsonuc, 2);
    document.getElementById('brutvazbag').innerHTML=vazbagsonuc;

}
function FormOnLoadAnaSayfa() {
    if (typeof(Storage) != "undefined") {

        urldenlocalstoragekontrol();

        document.getElementById("brutyapisizcins").innerHTML=yuvarla((Number(localStorage.getItem("ayarCins5"))/1.18),2);
        document.getElementById("brutvasifcins").innerHTML=yuvarla((Number(localStorage.getItem("ayarCins6"))/1.18),2);
        document.getElementById("brutvasifarazicins").innerHTML=yuvarla(((Number(localStorage.getItem("ayarCins7"))+Number(localStorage.getItem("ayarCins6")))/1.18),2);
        document.getElementById("brutkatilavesicins").innerHTML=yuvarla((Number(localStorage.getItem("ayarCins4"))/1.18),2);
        
        var deneme = localStorage.getItem("ayarMahalleyontem");
        if(deneme == "ucret"){
            document.getElementById('kmucretsecilen').innerHTML="ÜCRET";
            }
        else if(deneme == "km"){
            document.getElementById('kmucretsecilen').innerHTML="KM";
        }
        else{document.getElementById('kmucretsecilen').innerHTML="KM/ÜCRET";}
    } 
    else {
        
    } 
}
function FormOnLoadAyarlar() {
    if (typeof(Storage) != "undefined") {
        //console.log(localStorage.length);
        urldenlocalstoragekontrol();
        // Verilere Erişme
        // Genel Ayarlarının Yüklenmesi
        document.getElementById("ayarlarSozlesmeBedeliDurum").checked = JSON.parse(localStorage.getItem("ayarSozlesmeBedeliDurum"));
        document.getElementById("ayarlarYuvarlamaDurum").checked = JSON.parse(localStorage.getItem("ayarYuvarlamaKatDurum"));

        document.getElementById("ayarlarSozlesmeBedeli").value = localStorage.getItem("ayarSozlesmeBedeli");
        document.getElementById("ayarlarSehir").value = localStorage.getItem("ayarSehir");
        document.getElementById("ayarlarYuvarlama").value = localStorage.getItem("ayarYuvarlama");
        document.getElementById("ayarlarOnaydamga").value = localStorage.getItem("ayarOnaydamga");
        document.getElementById("ayarlarBelge").value = localStorage.getItem("ayarBelge");
        document.getElementById("ayarlarKontrolluk").value = localStorage.getItem("ayarKontrolluk");
        document.getElementById("ayarlarYakitlt").value = localStorage.getItem("ayarYakitlt");
        document.getElementById("ayarlarYakitkm").value = localStorage.getItem("ayarYakitkm");
        document.getElementById("jsontextarea").value = localStorage.getItem("ayarjsontextarea");
        
        var deneme = localStorage.getItem("ayarMahalleyontem");
        function setSelectedIndex(s, valsearch){
                // Loop through all the items in drop down list
                for (i = 0; i< s.options.length; i++){ 
                    if (s.options[i].value == valsearch){
                    // Item is found. Set its property and exit
                    s.options[i].selected = true;
                    break;
                    }
                }
                return;
            }

        if(deneme == "ucret"){
                setSelectedIndex(document.getElementById("mahallehesapyontemi"),"Ücret Verisiyle Hesaplama");
            }
        if(deneme == "km"){
                setSelectedIndex(document.getElementById("mahallehesapyontemi"),"Km Verisiyle Hesaplama");
        }
        else{setSelectedIndex(document.getElementById("mahallehesapyontemi"),"Ücret Verisiyle Hesaplama");}

        // TKGM Ayarlarının Yüklenmesi
        document.getElementById("ayarlarApl1").value=localStorage.getItem("ayarApl1");
        document.getElementById("ayarlarApl2").value=localStorage.getItem("ayarApl2");
        document.getElementById("ayarlarApl3").value=localStorage.getItem("ayarApl3");
        document.getElementById("ayarlarApl4").value=localStorage.getItem("ayarApl4");
        document.getElementById("ayarlarApl5").value=localStorage.getItem("ayarApl5");
        document.getElementById("ayarlarApl6").value=localStorage.getItem("ayarApl6");
        document.getElementById("ayarlarApl7").value=localStorage.getItem("ayarApl7");
        document.getElementById("ayarlarApl8").value=localStorage.getItem("ayarApl8");
        document.getElementById("ayarlarApl9").value=localStorage.getItem("ayarApl9");
        document.getElementById("ayarlarApl10").value=localStorage.getItem("ayarApl10");
        document.getElementById("ayarlarAply1").value=localStorage.getItem("ayarAply1");
        document.getElementById("ayarlarAply2").value=localStorage.getItem("ayarAply2");
        document.getElementById("ayarlarCins1").value=localStorage.getItem("ayarCins1");
        document.getElementById("ayarlarCins2").value=localStorage.getItem("ayarCins2");
        document.getElementById("ayarlarCins3").value=localStorage.getItem("ayarCins3");
        document.getElementById("ayarlarCins4").value=localStorage.getItem("ayarCins4");
        document.getElementById("ayarlarCins5").value=localStorage.getItem("ayarCins5");
        document.getElementById("ayarlarCins6").value=localStorage.getItem("ayarCins6");
        document.getElementById("ayarlarCins7").value=localStorage.getItem("ayarCins7");
        document.getElementById("ayarlarCins8").value=localStorage.getItem("ayarCins8");
        document.getElementById("ayarlarBirl1").value=localStorage.getItem("ayarBirl1");
        document.getElementById("ayarlarBirl2").value=localStorage.getItem("ayarBirl2");
        document.getElementById("ayarlarIrt1").value=localStorage.getItem("ayarIrt1");
        document.getElementById("ayarlarIrt2").value=localStorage.getItem("ayarIrt2");
        document.getElementById("ayarlarBbd1").value=localStorage.getItem("ayarBbd1");
        document.getElementById("ayarlarBbd2").value=localStorage.getItem("ayarBbd2");
        document.getElementById("ayarlarZtt1").value=localStorage.getItem("ayarZtt1");
        document.getElementById("ayarlarZtt2").value=localStorage.getItem("ayarZtt2");
        document.getElementById("ayarlarEnAzUcret").value=localStorage.getItem("ayarEnAzUcret");
        document.getElementById("ayarlarRpr1").value=localStorage.getItem("ayarRpr1");

        //hkmo ayarlarının yüklenmesi
        document.getElementById("ayarlarVbp1").value=localStorage.getItem("ayarVbp1");
        document.getElementById("ayarlarVbp2").value=localStorage.getItem("ayarVbp2");
        document.getElementById("ayarlarVbp3").value=localStorage.getItem("ayarVbp3");
        document.getElementById("ayarlarVbp4").value=localStorage.getItem("ayarVbp4");
        document.getElementById("ayarlarVbp5").value=localStorage.getItem("ayarVbp5");
        document.getElementById("ayarlarVbp6").value=localStorage.getItem("ayarVbp6");
        document.getElementById("ayarlarVbp7").value=localStorage.getItem("ayarVbp7");
        document.getElementById("ayarlarVbp8").value=localStorage.getItem("ayarVbp8");

    } 
    else {
        
    }
}

function genelayarkaydet() {
    sozlesmeBedeliDurum=document.getElementById("ayarlarSozlesmeBedeliDurum");
    yuvarlamaKatDurum=document.getElementById("ayarlarYuvarlamaDurum");

    sozlesmeBedeli=document.getElementById("ayarlarSozlesmeBedeli").value;
    sehirKatsayisi=document.getElementById("ayarlarSehir").value;
    yuvarlamaKat=document.getElementById("ayarlarYuvarlama").value;
    onaydamagaKatsayi=document.getElementById("ayarlarOnaydamga").value;
    belgeKatsayi=document.getElementById("ayarlarBelge").value;
    kontrollukKatsayi=document.getElementById("ayarlarKontrolluk").value;

    // Eğer Browserın desteği yoksa hata verecek
    if (typeof(Storage) != "undefined") {
        // Verileri Depolama
        localStorage.setItem("ayarSozlesmeBedeliDurum", sozlesmeBedeliDurum.checked);
        localStorage.setItem("ayarYuvarlamaKatDurum", yuvarlamaKatDurum.checked);

        localStorage.setItem("ayarSozlesmeBedeli", sozlesmeBedeli);
        localStorage.setItem("ayarSehir", sehirKatsayisi);
        localStorage.setItem("ayarYuvarlama", yuvarlamaKat);
        localStorage.setItem("ayarOnaydamga", onaydamagaKatsayi);
        localStorage.setItem("ayarBelge", belgeKatsayi);
        localStorage.setItem("ayarKontrolluk", kontrollukKatsayi);
    } else {
        document.getElementById("hatagenelayar").innerHTML = "Tarayıcınızda Local Storage Özelliği Bulunmadığı için bunu kullanamazsınız!!!";
    }
}

function tkgmayarkaydet() {
    apl1=document.getElementById("ayarlarApl1").value;
    apl2=document.getElementById("ayarlarApl2").value;
    apl3=document.getElementById("ayarlarApl3").value;
    apl4=document.getElementById("ayarlarApl4").value;
    apl5=document.getElementById("ayarlarApl5").value;
    apl6=document.getElementById("ayarlarApl6").value;
    apl7=document.getElementById("ayarlarApl7").value;
    apl8=document.getElementById("ayarlarApl8").value;
    apl9=document.getElementById("ayarlarApl9").value;
    apl10=document.getElementById("ayarlarApl10").value;
    aply1=document.getElementById("ayarlarAply1").value;
    aply2=document.getElementById("ayarlarAply2").value;
    cins1=document.getElementById("ayarlarCins1").value;
    cins2=document.getElementById("ayarlarCins2").value;
    cins3=document.getElementById("ayarlarCins3").value;
    cins4=document.getElementById("ayarlarCins4").value;
    cins5=document.getElementById("ayarlarCins5").value;
    cins6=document.getElementById("ayarlarCins6").value;
    cins7=document.getElementById("ayarlarCins7").value;
    cins8=document.getElementById("ayarlarCins8").value;
    birl1=document.getElementById("ayarlarBirl1").value;
    birl2=document.getElementById("ayarlarBirl2").value;
    irt1=document.getElementById("ayarlarIrt1").value;
    irt2=document.getElementById("ayarlarIrt2").value;
    bbd1=document.getElementById("ayarlarBbd1").value;
    bbd2=document.getElementById("ayarlarBbd2").value;
    ztt1=document.getElementById("ayarlarZtt1").value;
    ztt2=document.getElementById("ayarlarZtt2").value;

    enazucret=document.getElementById("ayarlarEnAzUcret").value;
    rpr1=document.getElementById("ayarlarRpr1").value;

    // document.getElementById("ayarlarSozlesmeBedeli").value = localStorage.getItem("ayarSozlesmeBedeli");

    // Eğer Browserın desteği yoksa hata verecek
    if (typeof(Storage) != "undefined") {
        // Verileri Depolama
        localStorage.setItem("ayarApl1", apl1);
        localStorage.setItem("ayarApl2", apl2);
        localStorage.setItem("ayarApl3", apl3);
        localStorage.setItem("ayarApl4", apl4);
        localStorage.setItem("ayarApl5", apl5);
        localStorage.setItem("ayarApl6", apl6);
        localStorage.setItem("ayarApl7", apl7);
        localStorage.setItem("ayarApl8", apl8);
        localStorage.setItem("ayarApl9", apl9);
        localStorage.setItem("ayarApl10", apl10);
        localStorage.setItem("ayarAply1", aply1);
        localStorage.setItem("ayarAply2", aply2);
        localStorage.setItem("ayarCins1", cins1);
        localStorage.setItem("ayarCins2", cins2);
        localStorage.setItem("ayarCins3", cins3);
        localStorage.setItem("ayarCins4", cins4);
        localStorage.setItem("ayarCins5", cins5);
        localStorage.setItem("ayarCins6", cins6);
        localStorage.setItem("ayarCins7", cins7);
        localStorage.setItem("ayarCins8", cins8);
        localStorage.setItem("ayarBirl1", birl1);
        localStorage.setItem("ayarBirl2", birl2);
        localStorage.setItem("ayarIrt1", irt1);
        localStorage.setItem("ayarIrt2", irt2);
        localStorage.setItem("ayarBbd1", bbd1);
        localStorage.setItem("ayarBbd2", bbd2);
        localStorage.setItem("ayarZtt1", ztt1);
        localStorage.setItem("ayarZtt2", ztt2);

        localStorage.setItem("ayarEnAzUcret", enazucret);

        localStorage.setItem("ayarRpr1", rpr1);

    }
    else {
        document.getElementById("hatatkgmayar").innerHTML = "Tarayıcınızda Local Storage Özelliği Bulunmadığı için bunu kullanamazsınız!!!";
    }

}

function hkmoayarkaydet() {
    vbp1=document.getElementById("ayarlarVbp1").value;
    vbp2=document.getElementById("ayarlarVbp2").value;
    vbp3=document.getElementById("ayarlarVbp3").value;
    vbp4=document.getElementById("ayarlarVbp4").value;
    vbp5=document.getElementById("ayarlarVbp5").value;
    vbp6=document.getElementById("ayarlarVbp6").value;
    vbp7=document.getElementById("ayarlarVbp7").value;
    vbp8=document.getElementById("ayarlarVbp8").value;

    if (typeof(Storage) != "undefined") {
        localStorage.setItem("ayarVbp1", vbp1);
        localStorage.setItem("ayarVbp2", vbp2);
        localStorage.setItem("ayarVbp3", vbp3);
        localStorage.setItem("ayarVbp4", vbp4);
        localStorage.setItem("ayarVbp5", vbp5);
        localStorage.setItem("ayarVbp6", vbp6);
        localStorage.setItem("ayarVbp7", vbp7);
        localStorage.setItem("ayarVbp8", vbp8);
    }
    else {
        document.getElementById("hatahkmoayar").innerHTML = "Tarayıcınızda Local Storage Özelliği Bulunmadığı için bunu kullanamazsınız!!!";
    }
}

function mahalleayarkaydet(jsontextarevar){
    jsontextarevar=document.getElementById("jsontextarea").value;
    yakitltKatsayi=document.getElementById("ayarlarYakitlt").value;
    yakitkmKatsayi=document.getElementById("ayarlarYakitkm").value;
    mahallehesapyontemivar=document.getElementById("mahallehesapyontemi").value;

    if (mahallehesapyontemivar == "Ücret Verisiyle Hesaplama"){
        mahallehesapyontemivar ="ucret";
    }
    if (mahallehesapyontemivar == "Km Verisiyle Hesaplama"){
        mahallehesapyontemivar="km";
    }

    // Eğer Browserın desteği yoksa hata verecek
    if (typeof(Storage) != "undefined") {
        // Verileri Depolama
        localStorage.setItem("ayarMahalleyontem", mahallehesapyontemivar);
        localStorage.setItem("ayarYakitlt", yakitltKatsayi);
        localStorage.setItem("ayarYakitkm", yakitkmKatsayi);
        localStorage.setItem("ayarjsontextarea", jsontextarevar);
    } else {
        document.getElementById("hatamahalleayar").innerHTML = "Tarayıcınızda Local Storage Özelliği Bulunmadığı için bunu kullanamazsınız!!!";
    }
}
