

const Blur = ({ gap = 8, gapX, gapY, unit = 'vh' }) => {
  const horizontalGap = gapX ?? gap
  const verticalGap = gapY ?? gap

  return (
    <div
      className='absolute z-0 rounded-4xl bg-black/20 backdrop-blur overflow-hidden'
      style={{
        top: `${verticalGap}${unit}`,
        bottom: `${verticalGap}${unit}`,
        left: `${horizontalGap}${unit}`,
        right: `${horizontalGap}${unit}`,
      }}
    />
  )
}

export default Blur


// Example Usage
// match 12vh gap on all sides (default unit vh)
{/* <Blur gap={12} />

// 15vh top/bottom, 8vh left/right
<Blur gapY={15} gapX={8} />

// use viewport width units or pixels
<Blur gap={5} unit="vw" />
<Blur gap={40} unit="px" /> */}