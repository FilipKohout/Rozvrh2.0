# Rozvrh++
Projekt umožnuje vybrat si školu a třídu a podívat se na rozvrh, odpočet kdy končí daná hodina, kdy můžu jít domů a zobrazení informací o jednotlivých hodinách.

## Technologie
- **TypeScript**
- **React**
- **Vite**
- **Google Fonts**: import ikon.
- **React Router**
- **React Query**
- **Tailwind**

## Struktura projektu
- `src/components`
- `src/hooks`
- `src/providers`: obsahuje kontexty, ve kterých jsou uložená data.
- `src/routes`: obsahuje jednotlivé stránky.
- `src/services`: obsahuje funkce, které volají API.

## Funkcionality
### Výběr obce, školy a třídy
- Uživatelé mohou vybrat obec, školu a třídu pomocí komponenty `InitPage`.
- Data jsou načítána pomocí vlastních hooků (`useMunicipalities`, `useSchools`, `useTimetable`).
- Po výběru obce, školy a třídy je uživatel přesměrován na stránku s rozvrhem.

### Zobrazení rozvrhu
- Rozvrh je zobrazen na stránce `TimetablePage`.
- Zobrazují se zde jednotlivé hodiny, jejich časy a názvy.
- Uživatelé mohou vidět odpočet, kdy končí jednotlivé hodiny a kdy mohou jít domů.

### Zobrazení informací o hodinách
- Po kliknutí na hodinu se zobrazí detailní informace o dané hodině.

### Režim odpočtu
- Uživatelé mohou přepínat mezi režimem odpočtu v novém okně a běžným zobrazením.
- Tento odpočet může být iframován na jiné stránky.

## Budoucí vylepšení
- Dokončení možnosti přidat školu a třídu do oblíbených.
