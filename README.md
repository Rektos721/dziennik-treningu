# Dziennik Sztangi

Dziennik treningowy na telefon do planu FBW A/B. Jedna strona, bez backendu,
bez kont i bez śledzenia.

**Aplikacja: https://rektos721.github.io/dziennik-treningu/**

## Co robi

- Dwa treningi (A i B) naprzemiennie, podpowiada, który wypada następny
- Zapis serii: ciężar i powtórzenia, z podglądem tego, co było ostatnio
- Podpowiedź progresji: górna granica zakresu we wszystkich seriach → +2,5 kg
  i powrót na dół zakresu; w przeciwnym razie ten sam ciężar i jedno powtórzenie więcej
- Osobna historia dla wariantu sztanga / hantle na wyciskaniu poziomym
- Timer przerwy 90 s z wibracją
- Eksport: raport tekstowy do wklejenia oraz kopia JSON

## Dane

Wszystko siedzi w `localStorage` przeglądarki, na urządzeniu. Nic nie wychodzi na sieć,
bo nie ma dokąd. Konsekwencja: **dane są przypisane do jednego urządzenia i jednej
przeglądarki**, a wyczyszczenie danych witryny je kasuje. Stąd przycisk pobierania JSON.

## Offline

Service worker cache'uje powłokę aplikacji przy pierwszym otwarciu, więc na siłowni
działa bez zasięgu. Strategia: sieć najpierw, cache w razie jej braku.

## Rozwój

Czysty HTML, CSS i JavaScript w jednym pliku `index.html`. Zero zależności,
zero kroku budowania. Edytujesz plik, pushujesz, GitHub Pages publikuje.

Po zmianie `index.html` podbij `CACHE` w `sw.js`, inaczej urządzenia z zainstalowaną
aplikacją zostaną przy starej wersji.
