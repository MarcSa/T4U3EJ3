export interface TicketForm {
    subject: string;
    email: string;
    category: 'Error Técnico' | 'Consulta' | 'Facturación';
    invoiceID?: string;
    ver?: number;
    message: string;
}
