import { IUser } from './user.interface';

export enum ReportCategory {
  MisleadingContent = 'misleading-content',
  HateSpeech = 'hate-speech',
  Harassment = 'harassment',
  Spam = 'spam',
  Plagiarism = 'plagiarism',
  Threats = 'threats',
  AdultContent = 'adult-content',
  PrivacyViolation = 'privacy-violation',
  CopyrightInfringement = 'copyright-infringement',
  FakeNews = 'fake-news',
}

export interface IReport {
  id: number;
  category: ReportCategory;
  text?: string;
  targetId: number;
  reporter?: IUser;
  createdAt: Date;
}

export interface ICreateReportData {
  category: ReportCategory;
  text?: string;
}
