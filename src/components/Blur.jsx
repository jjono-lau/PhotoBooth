const Blur = ({
  children,
  className = '',
  paddingClass = 'p-6 sm:p-8',
  as: Component = 'div',
  ...rest
}) => {
  return (
    
    <Component
    
      className={`rounded-3xl bg-black/50 backdrop-blur  ${className}`}
      {...rest}
    >
    
      <div className={`h-full w-full ${paddingClass}`}>{children}</div>
    </Component>
  )
}

export default Blur

