'use client';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { type Experience as ExperienceType } from '@/types';

const Experience = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const experiences: ExperienceType[] = [
    {
      id: 1,
      company: 'Laboratorium Teknik Informatika UNPAS',
      position: 'Asisten Lab',
      duration: 'Sep 2023 - Present',
      description: [
        'Mengajar Matakuliah Praktikum untuk mahasiswa Teknik Informatika',
        'Membimbing praktikum pemrograman dan teknologi web',
        'Membantu mahasiswa dalam memahami konsep praktis teknologi informasi',
        'Mengelola laboratorium dan peralatan praktikum'
      ],
      technologies: ['Programming', 'Web Development', 'Database', 'Computer Networks']
    },
    {
      id: 2,
      company: 'Bangkit Academy',
      position: 'Cloud Computing Cohort',
      duration: 'Feb 2024 - Jul 2024',
      description: [
        'Mempelajari tentang Cloud Computing dengan instruktur dari Google, Tokopedia, Gojek, & Traveloka',
        'Membangun API untuk keperluan development aplikasi menggunakan Node.js',
        'Membangun sistem backend dan database menggunakan Sequelize dari Node.js',
        'Mengelola ekosistem Cloud Computing untuk aplikasi berbasis mobile Android menggunakan Google Cloud Platform'
      ],
      technologies: ['Google Cloud Platform', 'Node.js', 'Sequelize', 'Cloud Computing', 'API Development', 'Android Development']
    },
    {
      id: 3,
      company: 'Laboratorium Teknik Informatika UNPAS',
      position: 'Asisten Dosen',
      duration: 'Sep 2023 - Feb 2025',
      description: [
        'Mendampingi mahasiswa dalam pembelajaran matakuliah Internet dan Teknologi Web',
        'Membantu dosen dalam penyampaian materi praktikum',
        'Memberikan bimbingan dan evaluasi kepada mahasiswa',
        'Mengelola dan mempersiapkan materi pembelajaran praktikum'
      ],
      technologies: ['Internet Technology', 'Web Development', 'HTML', 'CSS', 'JavaScript', 'Teaching']
    },
    {
      id: 4,
      company: 'GDSC UNPAS',
      position: 'Staff Human Resources & Partnership',
      duration: 'Sep 2023 - Jun 2024',
      description: [
        'Bertanggung jawab dalam pembuatan administrasi untuk setiap acara yang diadakan oleh GDSC UNPAS',
        'Mengelola partnership dan kerjasama dengan berbagai pihak',
        'Mengkoordinasikan tim HR untuk mendukung berbagai kegiatan teknologi',
        'Membantu pengembangan komunitas developer di lingkungan kampus'
      ],
      technologies: ['Event Management', 'Partnership', 'Administration', 'Community Building']
    },
    {
      id: 5,
      company: 'PKKMB TIF UNPAS 2023',
      position: 'Wakil Ketua Pelaksana',
      duration: 'Apr 2023 - Nov 2023',
      description: [
        'Melakukan pembuatan konsep untuk acara PKKMB TIF UNPAS 2023',
        'Melakukan monitoring dan controlling kepada divisi-divisi yang dibawahi',
        'Melakukan komunikasi dengan pihak terkait seperti pihak birokrat, himpunan mahasiswa dan mahasiswa peserta',
        'Mengkoordinasikan seluruh rangkaian acara orientasi mahasiswa baru'
      ],
      technologies: ['Event Management', 'Leadership', 'Project Management', 'Communication']
    },
    {
      id: 6,
      company: 'Mentoring HMTIF UNPAS 2023',
      position: 'Ketua Pelaksana',
      duration: 'May 2023 - Jul 2023',
      description: [
        'Melakukan perencanaan dan pembuatan konsep untuk acara mentoring',
        'Melakukan monitoring kepada para mentor',
        'Melakukan koordinasi dengan dosen dan mahasiswa yang terkait pada kegiatan',
        'Memastikan program mentoring berjalan sesuai dengan tujuan pembelajaran'
      ],
      technologies: ['Mentoring', 'Event Planning', 'Coordination', 'Educational Program']
    },
    {
      id: 7,
      company: 'Himpunan Mahasiswa "Magenta" Teknik Informatika UNPAS',
      position: 'Staff Kominfo',
      duration: 'Aug 2022 - Jul 2023',
      description: [
        'Bertanggung jawab dalam tugas pembuatan konten harian di sosial media HMTIF-UNPAS',
        'Menjadi podcaster pada Podcast HMTIF-UNPAS',
        'Mengelola komunikasi dan informasi organisasi',
        'Membuat konten edukasi dan informatif untuk mahasiswa Teknik Informatika'
      ],
      technologies: ['Content Creation', 'Social Media Management', 'Podcasting', 'Digital Marketing']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div>
          {/* Section Title */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#9ECAD6]/20 to-[#58A0C8]/20 rounded-full text-[#113F67] text-sm font-medium mb-4">
              Career Journey
            </span>
            <h2 className={`font-black text-gray-900 mb-4 ${
              isMobile ? 'text-4xl' : 'text-6xl'
            }`}>
              WORK<br />
              <span className="bg-gradient-to-r from-[#113F67] via-[#34699A] to-[#58A0C8] bg-clip-text text-transparent">
                EXPERIENCE
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              My journey in technology education, cloud computing, and leadership roles in student organizations.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#58A0C8]/50 via-[#34699A]/50 to-[#113F67]/50 transform -translate-x-1/2 rounded-full"></div>
            
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`relative mb-16 flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full transform -translate-x-1/2 flex items-center justify-center shadow-lg z-10">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>

                {/* Experience Card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}
                >
                  <div className="relative">
                    {/* 3D Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                      {/* Company Badge */}
                      <div className="inline-flex items-center mb-4">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          index === 0 ? 'bg-green-400' : 
                          index === 1 ? 'bg-blue-400' : 'bg-purple-400'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          {experience.duration}
                        </span>
                      </div>

                      {/* Company & Position */}
                      <div className="mb-6">
                        <h3 className={`font-black text-gray-900 mb-2 ${
                          isMobile ? 'text-xl' : 'text-2xl'
                        }`}>
                          {experience.position}
                        </h3>
                        <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          @ {experience.company}
                        </h4>
                      </div>

                      {/* Description */}
                      <div className="mb-6 space-y-3">
                        {experience.description.map((item, descIndex) => (
                          <div
                            key={descIndex}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-600 leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div>
                        <h5 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                          Technologies Used
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1.5 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3D Shadow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl -z-10 transform translate-x-3 translate-y-3 opacity-20"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className={`hidden md:block absolute ${
                    index % 2 === 0 ? 'right-0' : 'left-0'
                  } top-8 w-32 h-32 opacity-10`}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${
                    index === 0 ? 'from-green-200 to-blue-200' :
                    index === 1 ? 'from-blue-200 to-purple-200' :
                    'from-purple-200 to-pink-200'
                  } rounded-3xl`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
