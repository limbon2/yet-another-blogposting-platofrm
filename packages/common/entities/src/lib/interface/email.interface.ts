export interface ISendEmailData {
  emails: string[];
  subject: string;
  template: string;
  context?: Record<string, unknown>;
}
