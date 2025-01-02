// Import all logos
import PoblacionLogo from "/src/assets/Poblacion.png";
import KabulawanLogo from "/src/assets/Kabulawan.png";
import DampilLogo from "/src/assets/Dampil.png";
import ManaolLogo from "/src/assets/Manaol.png";
import BanglayLogo from "/src/assets/Banglay.png";
import TabokLogo from "/src/assets/Tabok.png";
import KauswaganLogo from "/src/assets/Kauswagan.png";
import GastonLogo from "/src/assets/Gaston.png";
import LumboLogo from "/src/assets/Lumbo.png";
import UmagosLogo from "/src/assets/Umagos.png";

// Define the Barangay interface
interface Barangay {
  barangayName: string;
  logo: string; 
}

export const Barangays: Barangay[] = [
  {
    barangayName: "Poblacion",
    logo: PoblacionLogo,
  },
  {
    barangayName: "Kabulawan",
    logo: KabulawanLogo,
  },
  {
    barangayName: "Dampil",
    logo: DampilLogo,
  },
  {
    barangayName: "Manaol",
    logo: ManaolLogo,
  },
  {
    barangayName: "Banglay",
    logo: BanglayLogo,
  },
  {
    barangayName: "Tabok",
    logo: TabokLogo,
  },
  {
    barangayName: "Kauswagan",
    logo: KauswaganLogo,
  },
  {
    barangayName: "Gaston",
    logo: GastonLogo,
  },
  {
    barangayName: "Lumbo",
    logo: LumboLogo,
  },
  {
    barangayName: "Umagos",
    logo: UmagosLogo,
  },
];
