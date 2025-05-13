import { Loader } from 'lucide-react'
import type { ReactNode } from 'react'

type Prop = {
  renderItem: () => ReactNode
}

function NavigationLoader({ renderItem }: Prop) {
  return (
    <section
      className="w-screen h-dvh flex flex-col gap-6 items-center justify-center"
    >
      <Loader
        className='animate-spin'
        size={64}
      />
      { renderItem() }
    </section>
  )
}

export default NavigationLoader