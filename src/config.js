// Personalize your story here. Add up to 15 photos in public/assets/images/couple/.
export const LOVE_CONFIG = {
  girlfriendName: 'Esther',
  nickname: 'Ammu',
  teddyBoyName: 'Udhaya',
  teddyGirlName: 'Esther',
  // Replace this sample Thunglish letter whenever you're ready.
  loveLetter: `En Ammu…\n\nUn kooda irukkura ovvoru moment-um enakku romba special. Un sirippu en naal-a azhagaakkudhu, un anbu enakku veedu maadhiri.\n\nIndha birthday-la unakku solla virumburadhu onnu dhaan: nee enakku romba precious. Un dreams ellam nijamaaganum; naan eppovum un pakkathula iruppen.\n\nHappy birthday, en chellam. I love you, always. ❤️`,
  // Your couple photos loop in the memory scene and the final frame.
  coupleImages: Array.from({ length: 9 }, (_, i) => `/assets/images/couple/couple${i + 1}.jpeg`),
  backgroundMusic: '/assets/music/romantic-song.mp3',
  // Optional: set to '/assets/models/teddy.glb' after adding that file.
  teddyModel: null,
};
