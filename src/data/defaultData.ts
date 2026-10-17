import { AppData } from '../types';

export const defaultSchoolData: AppData = {
  config: {
    schoolName: "SidTech",
    logoUrl: "",
    tagline: "Learn | Grow | Build Your Future",
    address: "Boring Road, Patna, Bihar",
    postalCode: "",
    phone: "+91-7069492135",
    email: "",
    coreValues: "Knowledge | Character | Success",
    welcomeIntro: "We provide quality education with modern facilities to help every child grow, learn and achieve their dreams.",
    heroBadge: "WELCOME TO",
    heroTitle: "SidTech",
    aboutBadge: "ABOUT OUR SCHOOL",
    aboutTitle: "Building Bright Futures Together",
    aboutDescription: "As SidTech, we are committed to providing quality education, strong values and a safe learning environment for every child. Our mission is to nurture young minds with knowledge, discipline and confidence so they can build a better tomorrow.",
    stats: {
      students: "1000+",
      staff: "50+",
      years: "15+"
    },
    socialLinks: {
      facebook: "",
      youtube: "",
      instagram: "",
      twitter: ""
    },
    galleryBadge: "PHOTO GALLERY",
    galleryTitle: "Moments from Our Campus",
    staffBadge: "OUR DEDICATED STAFF",
    staffTitle: "Meet Our Esteemed Staff",
    quickLinksTitle: "Quick Links",
    noticesTitle: "Latest Notices",
    admissionBadge: "Admissions Open 2026-27",
    admissionTitle: "Request for Admission",
    admissionBody: "Give your child the best education for a brighter future.",
    admissionBtn: "Apply Now",
    quickLinkLabels: [
      "Admission Request", "Student Login", "Parent Login", "Staff Login",
      "Result", "Fee Structure", "Online Fee Payment", "Download Forms",
    ],
  },
  leaders: [
    {
      id: "principal",
      roleBadge: "Our Principal",
      name: "Mr. R. K. Singh",
      designation: "Principal",
      quote: "Education is not just about learning facts, it is about building character and preparing for life.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
      bio: "Mr. R. K. Singh has over 22 years of visionary experience in educational leadership, curriculum development, and student mentoring. He holds a Master's in Educational Administration from Delhi University.",
      qualifications: "M.Sc., M.Ed., UGC NET Qualified"
    },
    {
      id: "director",
      roleBadge: "Our Director",
      name: "Mr. A. K. Gupta",
      designation: "Director",
      quote: "Together we create opportunities, nurture talent and shape a better future.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
      bio: "Mr. A. K. Gupta is an educational entrepreneur and philanthropist dedicated to bringing modern world-class schooling infrastructure and experiential pedagogy to rural and semi-urban learners.",
      qualifications: "B.Tech (IIT), MBA, Ed.D Fellow"
    }
  ],
  staff: [
    {
      id: "staff-1",
      name: "Mrs. S. Verma",
      designation: "Vice Principal",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      qualification: "M.A. English, B.Ed (14 Yrs Exp)",
      department: "Administration & Languages"
    },
    {
      id: "staff-2",
      name: "Mr. P. Sharma",
      designation: "Academic Coordinator",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      qualification: "M.Sc. Mathematics, B.Ed (10 Yrs Exp)",
      department: "Senior Academics"
    },
    {
      id: "staff-3",
      name: "Mrs. N. Gupta",
      designation: "Head Mistress",
      photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=400",
      qualification: "M.Sc. Biology, B.Ed (12 Yrs Exp)",
      department: "Primary Wing"
    },
    {
      id: "staff-4",
      name: "Mr. A. Khan",
      designation: "IT Coordinator",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      qualification: "MCA, B.Sc. IT (8 Yrs Exp)",
      department: "Computer & ICT"
    },
    {
      id: "staff-5",
      name: "Mrs. R. Yadav",
      designation: "Exam Coordinator",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      qualification: "M.Com, B.Ed (9 Yrs Exp)",
      department: "Examination Cell"
    },
    {
      id: "staff-6",
      name: "Mr. V. Tiwari",
      designation: "Sports Incharge",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      qualification: "B.P.Ed, M.P.Ed (7 Yrs Exp)",
      department: "Physical Education"
    }
  ],
  photos: [
    {
      id: "photo-1",
      title: "Main Campus Building",
      category: "Campus",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      caption: "Our modern academic block with spacious smart classrooms."
    },
    {
      id: "photo-2",
      title: "Morning Assembly",
      category: "Activities",
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
      caption: "Daily discipline, values prayer, and student presentations."
    },
    {
      id: "photo-3",
      title: "Digital Library & Reading Room",
      category: "Academics",
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
      caption: "Over 8,000 titles, journals, and digital research workstations."
    },
    {
      id: "photo-4",
      title: "Sports & Green Ground",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      caption: "Outdoor sports complex for football, cricket, and athletics."
    },
    {
      id: "photo-5",
      title: "Science & Robotics Lab",
      category: "Academics",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
      caption: "Hands-on STEM learning equipped with modern apparatus."
    },
    {
      id: "photo-6",
      title: "Annual Cultural Fest",
      category: "Events",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
      caption: "Students showcasing talent in dance, theatre, and music."
    }
  ],
  videos: [
    {
      id: "video-featured",
      title: "SidTech",
      duration: "4:12",
      thumbnailUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isFeatured: true,
      description: "A Place to Learn, Grow and Succeed - Campus walk-through and philosophy."
    },
    {
      id: "video-1",
      title: "Annual Function",
      duration: "5:36",
      thumbnailUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Glipses of the grand annual cultural festival and awards night."
    },
    {
      id: "video-2",
      title: "Sports Day",
      duration: "3:45",
      thumbnailUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=500",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Inter-house track and field events and march past."
    },
    {
      id: "video-3",
      title: "Student Testimonials",
      duration: "2:58",
      thumbnailUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Hear from our board toppers and proud alumni."
    }
  ],
  notices: [
    {
      id: "notice-1",
      day: "25",
      month: "Oct",
      dateStr: "25 Oct 2025",
      title: "Parent Teacher Meeting will be held on 28 Oct 2025.",
      category: "Meeting",
      content: "All parents and guardians are cordially invited to attend the Parent-Teacher Meeting on 28th October from 9:00 AM to 1:00 PM. Discussion will focus on mid-term performance, student progress reports, and winter session activities.",
      attachmentName: "PTM_Circular_Oct2025.pdf",
      isUrgent: true
    },
    {
      id: "notice-2",
      day: "20",
      month: "Oct",
      dateStr: "20 Oct 2025",
      title: "Half Yearly Exam Schedule is available now.",
      category: "Examinations",
      content: "The datesheet for Classes 1 to 12 for the Half Yearly Examination 2025-26 has been published. Exams commence on 10th November 2025. Please download the detailed syllabus and timetable below.",
      attachmentName: "Datesheet_HalfYearly_2025.pdf",
      isUrgent: false
    },
    {
      id: "notice-3",
      day: "15",
      month: "Oct",
      dateStr: "15 Oct 2025",
      title: "Fee Payment last date extended to 15 Oct 2025.",
      category: "Accounts",
      content: "Upon request from several parents, the deadline for paying Q3 school fees without late fine has been extended till 15th October 2025. Fees can be paid online via the portal or at the school fee counter.",
      attachmentName: "Fee_Notice_Q3.pdf",
      isUrgent: false
    },
    {
      id: "notice-4",
      day: "10",
      month: "Oct",
      dateStr: "10 Oct 2025",
      title: "New Homework uploaded for Class 10.",
      category: "Academics",
      content: "Mathematics and Science assignments for Class 10 have been uploaded to the student portal. Students are advised to submit the handwritten practice papers to their respective subject teachers by Friday.",
      attachmentName: "Class10_Assignments_Oct.pdf",
      isUrgent: false
    },
    {
      id: "notice-5",
      day: "05",
      month: "Oct",
      dateStr: "05 Oct 2025",
      title: "Gandhi Jayanti & Dussehra Holiday Notice",
      category: "Holidays",
      content: "The school will observe national and festive holidays as per the academic calendar. Administrative offices will resume normal working hours post-holiday.",
      attachmentName: "Holiday_Calendar.pdf",
      isUrgent: false
    }
  ],
  feeStructure: [
    { ClassID: "c-nur", ClassName: "Pre-Nursery & Nursery", rows: [
      { HeadName: "Admission Fee", Frequency: "One-time", Amount: 2500 },
      { HeadName: "Tuition Fee", Frequency: "Monthly", Amount: 850 },
      { HeadName: "Annual Charges", Frequency: "Yearly", Amount: 1800 },
    ], total: 5150 },
    { ClassID: "c-ukg", ClassName: "LKG & UKG", rows: [
      { HeadName: "Admission Fee", Frequency: "One-time", Amount: 2500 },
      { HeadName: "Tuition Fee", Frequency: "Monthly", Amount: 950 },
      { HeadName: "Annual Charges", Frequency: "Yearly", Amount: 1800 },
    ], total: 5250 },
    { ClassID: "c-1-3", ClassName: "Class 1 to 3", rows: [
      { HeadName: "Admission Fee", Frequency: "One-time", Amount: 3000 },
      { HeadName: "Tuition Fee", Frequency: "Monthly", Amount: 1100 },
      { HeadName: "Annual Charges", Frequency: "Yearly", Amount: 2200 },
    ], total: 6300 },
    { ClassID: "c-6-8", ClassName: "Class 6 to 8", rows: [
      { HeadName: "Admission Fee", Frequency: "One-time", Amount: 3500 },
      { HeadName: "Tuition Fee", Frequency: "Monthly", Amount: 1450 },
      { HeadName: "Annual Charges", Frequency: "Yearly", Amount: 2600 },
    ], total: 7550 },
    { ClassID: "c-9-10", ClassName: "Class 9 & 10", rows: [
      { HeadName: "Admission Fee", Frequency: "One-time", Amount: 4500 },
      { HeadName: "Tuition Fee", Frequency: "Monthly", Amount: 1850 },
      { HeadName: "Annual Charges", Frequency: "Yearly", Amount: 3200 },
    ], total: 9550 },
  ],
  classes: [
    { ClassID: "c-nur", ClassName: "Nursery", Sections: ["A"] },
    { ClassID: "c-ukg", ClassName: "UKG", Sections: ["A"] },
    { ClassID: "c-1-3", ClassName: "Class 1", Sections: ["A", "B"] },
    { ClassID: "c-6-8", ClassName: "Class 6", Sections: ["A", "B"] },
    { ClassID: "c-9-10", ClassName: "Class 10", Sections: ["A"] },
  ],
  source: 'fallback_local'
};
