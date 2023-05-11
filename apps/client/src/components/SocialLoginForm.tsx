'use client'

import '@/lib/amplify/client'
import { Auth } from 'aws-amplify'
import { HTMLAttributes } from 'react'
import { Button } from '@/components/Button'

export const SocialLoginForm = ({
  children,
}: HTMLAttributes<HTMLDivElement>) => {
  const signIn = async () => {
    await Auth.federatedSignIn({
      customProvider: 'Google',
    })
  }

  return (
    <div>
      <Button className="px-3.5 py-3" onClick={signIn}>
        {children}
      </Button>
    </div>
  )
}
