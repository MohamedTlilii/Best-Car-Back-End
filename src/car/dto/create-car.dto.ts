export class CreateCarDto {
  // Basic Information
  productname: string;
  image: string[];
  price: number;
  // Identification Pieces
  // piecedidentitéface: string;
  // piecedidentitéverso: string;

  // Car Characteristics
  disponibilite: string;
  carrosserie: string;
  garantie: number;
  nombredeplaces: number;
  nombredeportes: number;

  // Motorization
  nombredecylindres: number;
  energie: string;
  puissancefiscale: number;
  puissancechdin: number;
  couple: number;
  cylindree: number;

  // Transmission
  boite: string;
  nombrederapports: number;
  transmission: string;

  // Dimensions
  longueur: number;
  largeur: number;
  hauteur: number;
  volumeducoffre: number;

  // Performances
  kmh: number;
  vitessemaxi: number;

  // Consumption
  consommationurbaine: number;
  consommationextraurbaine: number;
  consommationmixte: number;
  emissionsdec: number;

  // Safety Equipment
  abs: string;
  airbags: string;
  alarmeantivol: string;
  allumageautomatiquedesfeux: string;
  antidemarragelectronique: string;
  controledepressiondespneus: string;

  // Driving Assistance
  antipatinage: string;
  aideaumaintiendanslavoie: string;
  aideaustationnement: string;
  detecteurdefatigue: string;
  directionassistee: string;
  regulateurdevitesse: string;
  limiteurdevitesse: string;

  // Exterior Equipment
  baguettesexterieuresdencadrementdesvitres: string;
  elementsexterieurscouleurcarrosserie: string;
  feuxaled: string;
  jantes: string;
  phares: string;

  // Audio & Communication
  autoradio: string;
  connectivite: string;
  ecrancentral: number;

  // Interior Equipment
  accoudoirs: string;
  cieldepavillon: string;
  lumieresdambiance: string;
  sellerie: string;
  seuilsdeportes: string;
  siegesreglablesenhauteur: string;
  tapisdesol: string;
  volant: string;
  volantreglable: string;

  // Functional Equipment
  climatisation: string;
  detecteurdepluie: string;
  fermeturecentralisee: string;
  freindestationnement: string;
  ordinateurdebord: string;
  retroviseursexterieurs: string;
  retroviseurinterieur: string;
  vitreselectriques: string;
}
