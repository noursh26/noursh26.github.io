import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'
import {
  Books, BookOpenText, Bookmarks, Browsers, Buildings, ChartLineUp, ChatsCircle, CircleHalf, CloudArrowUp,
  Code, Compass, Database, DeviceMobile, Devices, FlowArrow, ForkKnife, HardDrives, Kanban, Lightning,
  MagnifyingGlass, MapPin, Medal, Path, Robot, RocketLaunch, Sparkle, SquaresFour, Storefront, SwimmingPool,
  Timer, Translate, Trophy, WifiSlash, Wrench,
} from '@phosphor-icons/react'
import type { IconKey } from './content'

/* One icon family for the whole page (Phosphor), one weight per role:
   duotone for content icons, regular for controls. */
const MAP: Record<IconKey, ComponentType<IconProps>> = {
  pin: MapPin, browsers: Browsers, database: Database, phone: DeviceMobile, robot: Robot, rocket: RocketLaunch,
  offline: WifiSlash, devices: Devices, halfMoon: CircleHalf, buildings: Buildings,
  grid: SquaresFour, lightning: Lightning, trophy: Trophy, medal: Medal,
  search: MagnifyingGlass, store: Storefront, fork: ForkKnife, chats: ChatsCircle, book: BookOpenText, chart: ChartLineUp,
  kanban: Kanban, timer: Timer, flow: FlowArrow, pool: SwimmingPool, path: Path, wrench: Wrench,
  books: Books, sparkle: Sparkle, bookmarks: Bookmarks, servers: HardDrives, translate: Translate, cloud: CloudArrowUp,
  compass: Compass, code: Code,
}

export function Glyph({ name, className = 'glyph', ...rest }: { name: IconKey } & IconProps) {
  const Icon = MAP[name]
  return <Icon className={className} weight="duotone" aria-hidden="true" {...rest} />
}
