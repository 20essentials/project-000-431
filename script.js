document.addEventListener('mousemove', e => {
  const { clientX: x, clientY: y } = e;
  const $item = document.elementFromPoint(x, y);
  if ($item.classList.contains('item')) {
    $item.classList.add('flip');
  }
});

document.addEventListener('touchstart', e => {
  const handleMove = e => {
    document.addEventListener('touchend', handleEnd);
    const { clientX: x, clientY: y } = e.touches[0];
    const $item = document.elementFromPoint(x, y);
    if ($item.classList.contains('item')) {
      $item.classList.add('flip');
    }
  };

  const handleEnd = () => {
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
  };

  document.addEventListener('touchmove', handleMove);
});
