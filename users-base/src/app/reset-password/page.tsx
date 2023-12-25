import { Metadata } from 'next'
import ResetPassword from '../../reset-password'
 
export const metadata: Metadata = {
  title: 'Reset password',
}
 
export default function Page() {
  return (
    <ResetPassword />
  )
}