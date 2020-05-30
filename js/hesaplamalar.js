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

function aplikasyonbrut(parselalanapl) {
    parselalanapl=Number(document.getElementById("parselalanapl").value);
    // document.getElementById('brutapl').innerHTML=nitelikapl;
    var nitelikkatsayi = nitelik(document.getElementById("nitelikapl").value);
    document.getElementById('brutapl').innerHTML=nitelikkatsayi;
}