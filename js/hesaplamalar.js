function yuvarla(sonuc, basamak) {
    return Number(Math.round(sonuc+'e'+basamak)+'e-'+basamak);
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
        document.getElementById('kontrolluk').innerHTML="Kontrollük : "+"0";
    }
    else {
        var kontrolluk = blg+knt;
        document.getElementById('kontrolluk').innerHTML="Kontrollük : "+knt;
    }

    //Stopaj durumuna göre hesaplama yapılıyor
    stopajdurum = document.getElementById("stopajKontrol");
    if (stopajdurum.checked == false){
        
    }
    else {
        var stopaj = brut*0.2;
        stopaj = Number(stopaj.toFixed(2));
        brutkdv=brut+kdv-stopaj;
    }

    //Değişkenlere göre işlem ücreti hesaplanıyor
    var toplam=brut+kdv+kontrolluk-stopaj+yol+sozlesmebedeli+damgaonay;
    toplam = yuvarla(toplam, 2);

    //Sonuçların ekrana yazdırılması kısmı
    document.getElementById('sonuc').innerHTML="Sonuç : "+toplam;
    document.getElementById('brutson').innerHTML="Brüt : "+brut;
    document.getElementById('kdv').innerHTML="Kdv : "+kdv;
    document.getElementById('belge').innerHTML="Belge Alımı : "+blg;
    document.getElementById('kontrolluktoplam').innerHTML="Harç Toplam : "+kontrolluk;
    document.getElementById('stopaj').innerHTML="Stopaj : "+stopaj;
    document.getElementById('brutkdv').innerHTML="Net : "+brutkdv;
    document.getElementById('damgaonay').innerHTML="Onay+Damga : "+damgaonay;
    document.getElementById('sozlesmebedeli').innerHTML="Sözl. Bedeli : "+sozlesmebedeli;
    document.getElementById('yolson').innerHTML="Yol : "+yol;
    document.getElementById('faturaverileri').innerHTML="~ Fatura Verileri ~";
    document.getElementById('digerveriler').innerHTML="~ Diğer Veriler ~";
}