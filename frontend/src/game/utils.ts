export const resize = (game: Phaser.Game) => {
  const width = Math.min(window.innerWidth, 1880);
  game.scale.resize(width, 2700);
};
