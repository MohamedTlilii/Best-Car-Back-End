import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Event } from '../../event/entities/event.entity';

// Fiche technique

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productname: string;

  @Column('simple-array')
  image: string[];

  @Column()
  price: number;

  // Caractéristiques

  @Column({ type: 'varchar', default: 'available' })
  disponibilite: string;

  @Column()
  carrosserie: string;

  @Column()
  garantie: number;

  @Column()
  nombredeplaces: number;

  @Column()
  nombredeportes: number;

  // Motorisation

  @Column()
  nombredecylindres: number;

  @Column()
  energie: string;

  @Column()
  puissancefiscale: number;

  @Column()
  puissancechdin: number;

  @Column()
  couple: number;

  @Column()
  cylindree: number;

  // Transmission

  @Column()
  boite: string;

  @Column()
  nombrederapports: number;

  @Column()
  transmission: string;

  // Dimensions

  @Column()
  longueur: number;

  @Column()
  largeur: number;

  @Column()
  hauteur: number;

  @Column()
  volumeducoffre: number;

  // Performances

  @Column()
  kmh: number;

  @Column()
  vitessemaxi: number;

  // Consommation

  @Column({ type: 'float' })
  consommationurbaine: number;

  @Column({ type: 'float' })
  consommationextraurbaine: number;

  @Column({ type: 'float' })
  consommationmixte: number;

  @Column()
  emissionsdec: number;

  // Equipements de sécurité

  @Column()
  abs: string;

  @Column()
  airbags: string;

  @Column()
  alarmeantivol: string;

  @Column()
  allumageautomatiquedesfeux: string;

  @Column()
  antidemarragelectronique: string;

  @Column()
  controledepressiondespneus: string;

  // Aides à la conduite

  @Column()
  antipatinage: string;

  @Column()
  aideaumaintiendanslavoie: string;

  @Column()
  aideaustationnement: string;

  @Column()
  detecteurdefatigue: string;

  @Column()
  directionassistee: string;

  @Column()
  regulateurdevitesse: string;

  @Column()
  limiteurdevitesse: string;

  // Equipements extérieurs

  @Column()
  baguettesexterieuresdencadrementdesvitres: string;

  @Column()
  elementsexterieurscouleurcarrosserie: string;

  @Column()
  feuxaled: string;

  @Column()
  jantes: string;

  @Column()
  phares: string;

  // Audio et communication

  @Column()
  autoradio: string;

  @Column()
  connectivite: string;

  @Column({ type: 'float' })
  ecrancentral: number;

  // Equipements intérieurs

  @Column()
  accoudoirs: string;

  @Column()
  cieldepavillon: string;

  @Column()
  lumieresdambiance: string;

  @Column()
  sellerie: string;

  @Column()
  seuilsdeportes: string;

  @Column()
  siegesreglablesenhauteur: string;

  @Column()
  tapisdesol: string;

  @Column()
  volant: string;

  @Column()
  volantreglable: string;

  // Equipements fonctionnels

  @Column()
  climatisation: string;

  @Column()
  detecteurdepluie: string;

  @Column()
  fermeturecentralisee: string;

  @Column()
  freindestationnement: string;

  @Column()
  ordinateurdebord: string;

  @Column()
  retroviseursexterieurs: string;

  @Column()
  retroviseurinterieur: string;

  @Column()
  vitreselectriques: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Event, (event) => event.car)
  events: Event[];
  // disponibilite: boolean;
}
