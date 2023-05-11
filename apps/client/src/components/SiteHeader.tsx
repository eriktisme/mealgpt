import logo from '../../public/logo.svg'
import Image from 'next/image'
import { site } from '@/config'
import { SocialLoginForm } from './SocialLoginForm'

export const SiteHeader = () => (
  <header className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
    <div className="flex w-full items-center justify-between">
      <div>
        <Image className="h-[3rem] w-auto" src={logo} alt={site.name} />
      </div>
      <nav></nav>
      <div>
        <SocialLoginForm>Log in with Google</SocialLoginForm>
      </div>
    </div>
  </header>
)
