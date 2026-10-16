export interface SchoolConfig {
  schoolName: string;
  tagline: string;
  /** The school's own uploaded logo image (Settings -> Logo). Empty string = use the
   *  built-in generic crest instead. */
  logoUrl: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  coreValues: string;
  welcomeIntro: string;
  heroBadge: string;
  heroTitle: string;
  aboutBadge: string;
  aboutTitle: string;
  aboutDescription: string;
  stats: {
    students: string;
    staff: string;
    years: string;
  };
  socialLinks: {
    facebook: string;
    youtube: string;
    instagram: string;
    twitter: string;
  };
  /** All of these come from the admin's "Main Website" editor (Website.gs CMS) - every
   *  piece of text/labels an admin can change there is wired through to here, so nothing
   *  on the live site stays hardcoded/disconnected from what they edit. */
  galleryBadge: string;
  galleryTitle: string;
  staffBadge: string;
  staffTitle: string;
  quickLinksTitle: string;
  noticesTitle: string;
  admissionBadge: string;
  admissionTitle: string;
  admissionBody: string;
  admissionBtn: string;
  /** Labels for the 8 quick-action buttons (Admission, Student Login, Parent Login, Staff
   *  Login, Result, Fee Structure, Online Fee Payment, Download Forms), in that fixed order -
   *  admin can rename them from "Main Website" -> notices_admission section -> links. */
  quickLinkLabels: string[];
}

export interface Leader {
  id: string;
  roleBadge: string;
  name: string;
  designation: string;
  quote: string;
  image: string;
  bio?: string;
  qualifications?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
  qualification?: string;
  department?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl?: string;
  isFeatured?: boolean;
  views?: string;
  description?: string;
}

export interface NoticeItem {
  id: string;
  day: string;
  month: string;
  title: string;
  category?: string;
  dateStr?: string;
  content?: string;
  attachmentName?: string;
  isUrgent?: boolean;
}

/** One fee-head row inside a class's fee structure (matches getPublicFeeStructure()'s real shape). */
export interface FeeHeadRow {
  HeadName: string;
  Frequency: string;
  Amount: number;
}

/** Per-class fee structure, as returned by the real backend ({ClassID,ClassName,rows,total}). */
export interface FeeItem {
  ClassID: string;
  ClassName: string;
  rows: FeeHeadRow[];
  total: number;
}

/** A class + its sections, used to populate the admission form's dropdown (getPublicClasses()). */
export interface SchoolClass {
  ClassID: string;
  ClassName: string;
  Sections: string[];
}

export interface AdmissionInquiry {
  studentName: string;
  parentName: string;
  motherName?: string;
  mobile: string;
  email?: string;
  classId: string;
  dob: string;
  gender: string;
  address: string;
  previousSchool?: string;
  message?: string;
}

export interface AppData {
  config: SchoolConfig;
  leaders: Leader[];
  staff: StaffMember[];
  photos: GalleryPhoto[];
  videos: VideoItem[];
  notices: NoticeItem[];
  feeStructure: FeeItem[];
  classes: SchoolClass[];
  lastUpdated?: string;
  source: 'google_sheets' | 'fallback_local';
}
