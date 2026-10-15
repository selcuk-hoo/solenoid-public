# Solenoid

Endüksiyon bobini tasarımcısı: tarayıcıda `index.html` dosyasını açın.

Uygulama PWA olarak hazırdır (`manifest.json`, `sw.js`): bir web adresinden
yayınlandığında tablette "Ana ekrana ekle" ile kurulur ve çevrimdışı çalışır.
Yeni sürüm yayınlarken `sw.js` içindeki `SURUM` değerini değiştirin.

Hava çekirdekli solenoid için hedef merkez alan (mT) ve frekanstan (100–500 kHz)
yola çıkarak hesaplar:

- Alan düzgünlüğü (r–z sapma haritası, boyuna ve radyal profiller, bölge içi sapma)
- Endüktans, AC direnç (Dowell / litz yakınlık kaybı), empedans, Q, öz rezonans
- Akım, gerilim, kayıp güç, reaktif güç, rezonans kapasitesi
- İletken kalınlığı (akım derinliğine göre) ve sargı ölçüleri
- Soğutma: doğal / fanlı hava ısınması, boru içi su debisi ve basınç düşümü
- Çok katmanlı öz kapasite, sürücü ve rezonans devresi önerileri
- Uç sıklaştırma (uçlarda daha küçük adım) ve en iyi ayar araması
- Analitik uç durumlarla doğrulama testleri
