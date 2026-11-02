// Classes (survol) : l'application n'en a pas besoin, mais vous en croiserez.
// Exemple isolé, non utilisé par l'application.
import type { EquipmentStatus } from '../domain/types.js';

export class MaintenanceTicket {
  // `private` est vérifié par TypeScript uniquement (effacé dans le JS) ;
  // `#closedAt` serait un champ privé JavaScript, garanti à l'exécution.
  private readonly createdAt = new Date();

  // Propriétés de paramètre : déclarent et affectent les champs en une ligne.
  // (Syntaxe propre à TS ; elle n'est pas compatible avec l'option erasableSyntaxOnly.)
  constructor(
    public readonly equipmentId: number,
    public status: EquipmentStatus = 'maintenance',
  ) {}

  close(): void {
    this.status = 'active';
  }

  describe(): string {
    return `Ticket équipement #${this.equipmentId} (${this.status}) ouvert le ${this.createdAt.toLocaleDateString('fr-FR')}`;
  }
}

const ticket = new MaintenanceTicket(12);
ticket.close();

// @ts-expect-error - createdAt est privé.
ticket.createdAt;

// Sous le capot, les méthodes vivent sur le prototype, comme en JavaScript.
const sharesPrototype = Object.getPrototypeOf(ticket) === MaintenanceTicket.prototype;

export { sharesPrototype };
