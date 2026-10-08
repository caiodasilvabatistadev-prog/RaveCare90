import logo from '../assets/ravecareapp-logo-horizontal.png'

type BrandLogoProps = { className?: string }

export function BrandLogo({ className = '' }: BrandLogoProps) {
  return <img className={`brand-logo ${className}`} src={logo} alt="RaveCareApp" />
}
