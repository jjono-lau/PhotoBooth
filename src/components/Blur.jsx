const Blur = ({
  children,
  className = '',
  paddingClass = 'p-6 sm:p-8',
  as: Component = 'div',
  ...rest
}) => {
  return (
    <Component
      className={`rounded-3xl bg-black/40 backdrop-blur shadow-[0_25px_70px_rgba(0,0,0,0.35)] ${className}`}
      {...rest}
    >
      <div className={`h-full w-full ${paddingClass}`}>{children}</div>
    </Component>
  )
}

export default Blur

