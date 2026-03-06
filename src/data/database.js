export default [
  {
    id: 1,
    station: 'Welcome',
    sector: 'xyz',
    role: 'touchTable',
    screens: [
      {
        screen_id: 5,
        screen_name: 'home',
        persona_id: 3,
        visualizations: [
          {
            id: 9,
            title: 'Background',
            screen_id: 5,
            chart_type: 'background',
            data_sets: [
              {
                data_set_id: 9,
                visualization_id: 9,
                data_set: {
                  background_video: 'Particles_loop.mp4',
                  background_sound: 'Satie-Trois Gymnopedies.mp3',
                },
              },
            ],
          },
        ],
      },
      {
        screen_id: 6,
        screen_name: 'dashboard',
        persona_id: 3,
        visualizations: [
          {
            id: 10,
            title: 'Left group',
            screen_id: 6,
            chart_type: 'characters_group',
            data_sets: [
              {
                data_set_id: 10,
                visualization_id: 10,
                data_set: {
                  characters: [
                    {
                      id: 1,
                      name: 'Milena Parysow',
                      image: 'Welcome_Zone_Luminaries_Wall_Milena_Parysow.png',
                      shortDescription: 'Ashoka Cohort Argentina',
                      description:
                        '<strong><span style="font-size: 2.3rem">Milena Parysow, Ashoka Cohort Argentina</span></strong><br/><br/>This experience strengthened my entrepreneurial mindset by giving me clarity, practical tools, and a more strategic way to shape and communicate my project. I’m leaving with greater confidence, better structure, and the motivation to turn ideas into real, sustainable impact.<br/><br/><strong>12</strong> impact entrepreneurs<br/><strong>60k</strong> lives impacted',
                    },
                    {
                      id: 2,
                      name: 'Katarzyna Nabrdalik',
                      image: 'Welcome_Zone_Luminaries_Wall_Katarzyna_Nabrdalik.png',
                      shortDescription: 'CEO of Teach for Poland',
                      description:
                        '<strong><span style="font-size: 2.3rem">Katarzyna Nabrdalik, CEO of Teach for Poland</span></strong><br/><br/>The program helped changed our classroom practice, giving our teachers structure, confidence, and real project tools to help Polish students learn meaningfully.<br/><br/><strong>12k</strong> students inspired<br/><strong>27k</strong> lives impacted',
                    },
                  ],
                },
              },
            ],
          },
          {
            id: 11,
            title: 'Center group',
            screen_id: 6,
            chart_type: 'characters_group',
            data_sets: [
              {
                data_set_id: 11,
                visualization_id: 11,
                data_set: {
                  characters: [
                    {
                      id: 4,
                      name: 'Poornima Bhunia',
                      image: 'Welcome_Zone_Luminaries_Wall_Poornima_Bhunia.png',
                      shortDescription: 'Kultali Block, West Bengal,India.',
                      description:
                        '<strong><span style="font-size: 2.3rem">Poornima Bhunia, Kultali Block, West Bengal,India.</span></strong><br/><br/>The mangroves gave us more than protection—they gave us stability. Fish returned, livelihoods steadied, and for the first time, we save instead of borrowing after storms. Poornima Bhunia, Kultali Block, West Bengal, India.<br/><br/><strong>197k</strong> villlegers supported<br/><strong>492k</strong> lives impacted',
                    },
                    {
                      id: 5,
                      name: 'Navyashree',
                      image: 'Welcome_Zone_Luminaries_Wall_Navyashree.png',
                      shortDescription: 'Government High School,India.',
                      description:
                        '<strong><span style="font-size: 2.3rem">Navyashree, Government High School,India.</span></strong><br/><br/>When Skillbridge entered my life, I stopped doubting myself and started finding my voice. I learned to use technology with confidence, speak up without fear, and dream bigger about the impact I could create.<br/><br/><strong>241k</strong> students Direct Impact<br/><strong>600k</strong> lives impacted',
                    },
                  ],
                },
              },
            ],
          },
          {
            id: 12,
            title: 'Right group',
            screen_id: 6,
            chart_type: 'characters_group',
            data_sets: [
              {
                data_set_id: 12,
                visualization_id: 12,
                data_set: {
                  characters: [
                    {
                      id: 7,
                      name: 'Krishna C',
                      image: 'Welcome_Zone_Luminaries_Wall_Krishna_C.png',
                      shortDescription: 'Executive Director,Junior Achievement of the Philippines',
                      description:
                        '<strong><span style="font-size: 2.3rem">Krishna C, Executive Director,Junior Achievement of the Philippines</span></strong><br/><br/>Through the EY STEM App program, more than <strong>10,000</strong> Filipino senior high school students have discovered the confidence to pursue STEM—and the skills to shape an innovation‑driven future.<br/><br/><strong>56k</strong> students inspired<br/><strong>108k</strong> lives impacted',
                    },
                    {
                      id: 8,
                      name: 'Dany DY',
                      image: 'Welcome_Zone_Luminaries_Wall_Dany_DY.png',
                      shortDescription: 'Founder, FarmTop',
                      description:
                        '<strong><span style="font-size: 2.3rem">Dany DY, Founder, FarmTop</span></strong><br/><br/>When food began growing on our rooftops, communities gained more than just fresh vegetables; they gained a reliable livelihood and a new way to feed themselves sustainably.<br/><br/><strong>40 tons</strong> of annual harvest<br/><strong>5000</strong> lives impacted',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
