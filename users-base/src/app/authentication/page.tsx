import { Metadata } from 'next'
import Authentication from '../../authentication'
 
export const metadata: Metadata = {
  title: 'Authentication',
}
 
export default function Page() {
  return (
    <Authentication />
  )
}